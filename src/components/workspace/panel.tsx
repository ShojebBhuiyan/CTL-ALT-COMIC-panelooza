"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { RxPencil2, RxReload } from "react-icons/rx";

import { RenderedScene, RenderingModelVendor } from "@/types/ai";

import { useStore } from "@/components/render/store";

import { Progress } from "@/components/workspace/progress";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "usehooks-ts";
import { Bubble } from "./bubble";
import { localStorageKeys } from "@/constants/localStorageKeys";
import { defaultSettings } from "@/constants/default-settings";
import { getRender, newRender } from "@/actions/render/render";
import { EditModal } from "./edit-modal";
import { getInitialRenderedScene } from "@/actions/render/get-initial-rendered-scene";
import { initialRenderData } from "@/constants/initial-render-data";

interface PanelProps {
  savedUrl?: string;
  page: number;
  nbPanels: number;
  panel: number;

  className?: string;
  width?: number;
  height?: number;
}

export function Panel({
  savedUrl,
  page,
  nbPanels,
  panel,
  className = "",
  width = 1,
  height = 1,
}: PanelProps) {
  const panelIndex = page * nbPanels + panel;
  const panelId = `${panelIndex}`;
  const [mouseOver, setMouseOver] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  const preset = useStore((state) => state.preset);

  const setGeneratingImages = useStore((state) => state.setGeneratingImages);

  const panels = useStore((state) => state.panels);
  const prompt = panels[panelIndex] || "";

  const setPanelPrompt = useStore((state) => state.setPanelPrompt);

  const captions = useStore((state) => state.captions);
  const caption = captions[panelIndex] || "";
  const setPanelCaption = useStore((state) => state.setPanelCaption);

  const zoomLevel = useStore((state) => state.zoomLevel);

  const addToUpscaleQueue = useStore((state) => state.addToUpscaleQueue);

  const [_isPending, startTransition] = useTransition();
  const renderedScenes = useStore((state) => state.renderedScenes);
  const setRendered = useStore((state) => state.setRendered);

  const rendered = renderedScenes[panelIndex] || initialRenderData;


  const [revision, setRevision] = useState(0);

  const renderedRef = useRef<RenderedScene>();
  const renderedKey = JSON.stringify(rendered);
  useEffect(() => {
    renderedRef.current = rendered;
  }, [renderedKey]);

  // const timeoutRef = useRef<any>(null);

  const enableRateLimiter =
    `${process.env.NEXT_PUBLIC_ENABLE_RATE_LIMITER}` === "true";

  const [renderingModelVendor, _setRenderingModelVendor] =
    useLocalStorage<RenderingModelVendor>(
      localStorageKeys.renderingModelVendor,
      defaultSettings.renderingModelVendor
    );

  let delay = enableRateLimiter ? 1000 + 500 * panelIndex : 1000;

  const nbFrames = preset.id.startsWith("video") ? 16 : 1;

  const startImageGeneration = ({
    prompt,
    width,
    height,
    nbFrames,
    revision,
  }: {
    prompt: string;
    width: number;
    height: number;
    nbFrames: number;
    revision: number;
  }) => {
    if (!prompt?.length) {
      return;
    }

    setGeneratingImages(panelId, true);
    setRendered(panelId, initialRenderData);

    setTimeout(
      () => {
        startTransition(async () => {
          const withCache = revision === 0;

          let cacheInvalidationHack = "";
          const nbMaxRevisions = 10;
          for (let i = 0; i < revision && revision < nbMaxRevisions; i++) {
            const j = Math.random();
            cacheInvalidationHack += j < 0.3 ? "_" : j < 0.6 ? "," : "-";
          }

          let newRendered: RenderedScene;
          try {
            newRendered = await newRender({
              prompt: cacheInvalidationHack + " " + prompt,
              width,
              height,
            });
            if (!newRendered.status || newRendered.status === "error") {
              throw new Error("invalid status");
            }
          } catch (err) {
            try {
              newRendered = await newRender({
                prompt: cacheInvalidationHack + "   " + prompt,
                width,
                height,
              });
              if (!newRendered.status || newRendered.status === "error") {
                throw new Error("invalid status");
              }
            } catch (err2) {
              newRendered = {
                renderId: "",
                status: "error",
                assetUrl: "",
                alt: "",
                maskUrl: "",
                error: `${err2 || "unknown error"}`,
                segments: [],
              };
            }
          }

          if (newRendered) {
            setRendered(panelId, newRendered);

            if (newRendered.status === "completed") {
              setGeneratingImages(panelId, false);
              addToUpscaleQueue(panelId, newRendered);
            } else if (!newRendered.status || newRendered.status === "error") {
              setGeneratingImages(panelId, false);
            }
          } else {
            //
            setRendered(panelId, {
              renderId: "",
              status: "error",
              assetUrl: "",
              alt: "",
              maskUrl: "",
              error: "empty newRendered",
              segments: [],
            });
            setGeneratingImages(panelId, false);
            return;
          }
        });
      },
      enableRateLimiter ? 1000 * panel : 0
    );
  };

  useEffect(() => {
    if (!prompt.length) {
      return;
    }

    !savedUrl && startImageGeneration({ prompt, width, height, nbFrames, revision });
    return () => {
    };
  }, [prompt, width, height, nbFrames, revision]);

  const frameClassName = cn(
    //`flex`,
    `relative`,
    `w-full h-full`,
    `border-stone-800`,
    `transition-all duration-200 ease-in-out`,
    zoomLevel > 140
      ? `border-[2px] md:border-[4px] rounded-sm md:rounded-md`
      : zoomLevel > 120
        ? `border-[1.5px] md:border-[3px] rounded-xs md:rounded-sm`
        : zoomLevel > 90
          ? `border-[1px] md:border-[2px] rounded-xs md:rounded-sm`
          : zoomLevel > 40
            ? `border-[0.5px] md:border-[1px] rounded-none md:rounded-xs`
            : `border-transparent md:border-[0.5px] rounded-none md:rounded-none`,
    `shadow-sm`,
    `overflow-hidden`,
    `print:border-[1.5px] print:shadow-none`
  );

  const handleReload = () => {
    console.log(`Asked to reload panel ${panelId}`);
    setRevision(revision + 1);
  };

  const handleSavePrompt = (newPrompt: string) => {
    console.log(`Asked to save a new prompt: ${newPrompt}`);
    setPanelPrompt(newPrompt, panelIndex);
  };

  const handleSaveCaption = (newCaption: string) => {
    console.log(`Asked to save a new caption: ${newCaption}`);
    setPanelCaption(newCaption, panelIndex);
  };
  if (prompt && !rendered.assetUrl) {
    return (
      <div
        className={cn(
          frameClassName,
          `flex flex-col items-center justify-center`,
          className
        )}
      >
        <Progress isLoading />
      </div>
    );
  }

  const hasSucceededOrFailed =
    rendered.status === "completed" || rendered.status === "error";

  return (
    <div
      className={cn(
        frameClassName,
        { grayscale: preset.color === "grayscale" },
        className
      )}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      {prompt && rendered.assetUrl && caption ? (
        <Bubble onChange={handleSaveCaption}>{caption}</Bubble>
      ) : null}
      <div
        className={cn(
          `absolute`,
          `top-0 w-full`,
          `flex justify-between`,
          `p-2 space-x-2`,
          `print:hidden`
        )}
      >
        <div
          onClick={hasSucceededOrFailed ? handleReload : undefined}
          className={cn(
            `bg-stone-100 rounded-none`,
            `flex flex-row space-x-2 items-center`,
            `py-1 px-2 md:py-2 md:px-3`,
            `transition-all duration-200 ease-in-out`,
            hasSucceededOrFailed
              ? "opacity-95 cursor-pointer"
              : "opacity-50 cursor-wait",
            mouseOver && hasSucceededOrFailed
              ? `scale-95 hover:scale-100 hover:opacity-100`
              : `scale-0`
          )}
        >
          <RxReload className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
        </div>
        <EditModal
          isEnabled={hasSucceededOrFailed}
          existingPrompt={prompt}
          onSave={handleSavePrompt}
        >
          <div
            className={cn(
              `bg-stone-100 rounded-none`,
              `flex flex-row space-x-2 items-center`,
              `py-1 px-3 md:py-2 md:px-3 cursor-pointer`,
              `transition-all duration-200 ease-in-out`,
              hasSucceededOrFailed ? "opacity-95" : "opacity-50",
              mouseOver && hasSucceededOrFailed
                ? `scale-95 hover:scale-100 hover:opacity-100`
                : `scale-0`
            )}
          >
            <RxPencil2 className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
          </div>
        </EditModal>
      </div>

      {(rendered.assetUrl || !!savedUrl) && (
        <img
          ref={ref}
          src={rendered.assetUrl.length > 0 ? rendered.assetUrl : savedUrl}
          width={width}
          height={height}
          alt={rendered.alt}
          className={cn(`comic-panel w-full h-full object-cover max-w-max`)}
        />
      )}
    </div>
  );
}
