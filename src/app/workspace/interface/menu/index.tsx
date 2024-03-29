"use client";

import {
  PresetName
} from "@/app/engine/presets";
import { useStore } from "@/app/store";
import {
  LayoutName,
  defaultLayout
} from "@/app/workspace/layouts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import { LuSend } from "react-icons/lu";
import { defaultSettings } from "../settings-dialog/defaultSettings";
import { localStorageKeys } from "../settings-dialog/localStorageKeys";

export function Menu({
  draftPreset,
  setDraftPreset,
}: {
  draftPreset: PresetName;
  setDraftPreset: (preset: PresetName) => void;
}) {
  const preset = useStore((state) => state.preset);
  const prompt = useStore((state) => state.prompt);
  const layout = useStore((state) => state.layout);
  const setLayout = useStore((state) => state.setLayout);

  const setShowCaptions = useStore((state) => state.setShowCaptions);
  const showCaptions = useStore((state) => state.showCaptions);

  const generate = useStore((state) => state.generate);

  const isGeneratingStory = useStore((state) => state.isGeneratingStory);
  const atLeastOnePanelIsBusy = useStore(
    (state) => state.atLeastOnePanelIsBusy
  );
  const isBusy = isGeneratingStory || atLeastOnePanelIsBusy;

  const [lastDraftPromptA, setLastDraftPromptA] = useLocalStorage<string>(
    "LAST_DRAFT_PROMPT_A",
    ""
  );

  const [lastDraftPromptB, setLastDraftPromptB] = useLocalStorage<string>(
    "LAST_DRAFT_PROMPT_B",
    ""
  );

  const searchParams = useSearchParams();
  const requestedLayout =
    (searchParams?.get("layout") as LayoutName) || defaultLayout;

  const [draftPromptA, setDraftPromptA] = useState(lastDraftPromptA);
  const [draftPromptB, setDraftPromptB] = useState(lastDraftPromptB);
  const draftPrompt = `${draftPromptA}||${draftPromptB}`;

  const [draftLayout, setDraftLayout] = useState<LayoutName>(requestedLayout);

  useEffect(() => {
    if (lastDraftPromptA !== draftPromptA) {
      setLastDraftPromptA(draftPromptA);
    }
  }, [draftPromptA]);
  useEffect(() => {
    if (lastDraftPromptA !== draftPromptA) {
      setDraftPromptA(lastDraftPromptA);
    }
  }, [lastDraftPromptA]);
  useEffect(() => {
    if (lastDraftPromptB !== draftPromptB) {
      setLastDraftPromptB(draftPromptB);
    }
  }, [draftPromptB]);
  useEffect(() => {
    if (lastDraftPromptB !== draftPromptB) {
      setDraftPromptB(lastDraftPromptB);
    }
  }, [lastDraftPromptB]);

  const handleSubmit = () => {
    const promptChanged = draftPrompt.trim() !== prompt.trim();
    const presetChanged = draftPreset !== preset.id;
    const layoutChanged = draftLayout !== layout;
    if (!isBusy && (promptChanged || presetChanged || layoutChanged)) {
      generate(draftPrompt, draftPreset, draftLayout);
    }
  };

  useEffect(() => {
    const layoutChanged = draftLayout !== layout;
    if (layoutChanged && !isBusy) {
      setLayout(draftLayout);
    }
  }, [layout, draftLayout, isBusy]);

  return (
    <div>
      <div className="flex justify-end mb-4 space-x-2">
        <div className="flex flex-row items-center space-x-3">
          <Label>
            <span className="hidden md:inline">Caption</span>
            <span className="inline md:hidden">Cap.</span>
          </Label>
          <Switch checked={showCaptions} onCheckedChange={setShowCaptions} />
        </div>
        <button className="bg-black text-white px-4 py-2">Export</button>
        <button
          className="bg-black text-white px-4 py-2"
          onClick={() => window.print()}
        >
          Print
        </button>
        <button className="bg-black text-white px-4 py-2">Save</button>
        <button className="bg-black text-white px-4 py-2">Share</button>
      </div>
      <div className="flex flex-row space-x-2 md:space-x-3 w-full md:w-auto">
        <div
          className={cn(
            `transition-all duration-200 ease-in-out`,
            `flex flex-row items-center justify-start space-x-3`,
            `flex-grow`
          )}
        ></div>
        <div
          className={cn(
            `transition-all duration-200 ease-in-out`,
            `flex flex-row items-center justify-start space-x-3`,
            `w-40`
          )}
        ></div>
      </div>
      <div
        className={cn(
          `transition-all duration-200 ease-in-out`,
          `flex  flex-grow flex-col space-y-2 md:space-y-0 md:flex-row items-center md:space-x-3 w-full md:w-auto`
        )}
      >
        <div className="flex flex-row flex-grow w-full">
          <div className="flex flex-row flex-grow w-full">
            <Input
              placeholder="1. Story (eg. detective dog)"
              className={cn(
                `w-1/2 rounded-r-none`,
                `bg-gray-100 text-gray-700 dark:bg-gray-100 dark:text-gray-700`,
                `border-r-stone-100`
              )}
              onChange={(e) => {
                setDraftPromptB(e.target.value);
              }}
              onKeyDown={({ key }) => {
                if (key === "Enter") {
                  handleSubmit();
                }
              }}
              value={draftPromptB}
            />
            <Input
              placeholder="2. Style (eg 'rain, shiba')"
              className={cn(
                `w-1/2`,
                `bg-gray-100 text-gray-700 dark:bg-gray-100 dark:text-gray-700`,
                `border-l-gray-300 rounded-l-none rounded-r-none`
              )}
              onChange={(e) => {
                setDraftPromptA(e.target.value);
              }}
              onKeyDown={({ key }) => {
                if (key === "Enter") {
                  handleSubmit();
                }
              }}
              value={draftPromptA}
            />
          </div>
          <Button
            className="bg-blue-secondary hover:bg-green-secondary"
            onClick={() => {
              handleSubmit();
            }}
            disabled={!draftPrompt?.trim().length || isBusy}
          >
            <LuSend />
          </Button>
        </div>
      </div>
    </div>
  );
}
