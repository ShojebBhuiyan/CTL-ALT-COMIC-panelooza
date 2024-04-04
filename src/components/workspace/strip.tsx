"use client";
import { useEffect, useState, useTransition } from "react";

import { joinWords } from "@/lib/joinWords";
import { GeneratedPanel } from "@/types/ai";

import { getStoryContinuation } from "@/actions/queries/getStoryContinuation";
import { useStore } from "@/components/render/store";
import { defaultSettings } from "@/app/workspace/interface/settings-dialog/defaultSettings";
import { localStorageKeys } from "@/constants/localStorageKeys";
import { useDynamicConfig } from "@/lib/useDynamicConfig";
import { useLocalStorage } from "usehooks-ts";
import { Page } from "./page";

export default function Strip() {
  const [_isPending, startTransition] = useTransition();

  const { config, isConfigReady } = useDynamicConfig();
  const setGeneratingStory = useStore((s) => s.setGeneratingStory);

  const preset = useStore((s) => s.preset);
  const prompt = useStore((s) => s.prompt);

  const currentNbPages = useStore((s) => s.currentNbPages);
  const maxNbPages = useStore((s) => s.maxNbPages);
  const currentNbPanels = useStore((s) => s.currentNbPanels);
  const maxNbPanels = useStore((s) => s.maxNbPanels);

  const setCurrentNbPanelsPerPage = useStore(
    (s) => s.setCurrentNbPanelsPerPage
  );
  const setMaxNbPanelsPerPage = useStore((s) => s.setMaxNbPanelsPerPage);
  const setMaxNbPages = useStore((s) => s.setMaxNbPages);

  const setPanels = useStore((s) => s.setPanels);
  const setCaptions = useStore((s) => s.setCaptions);

  const zoomLevel = useStore((s) => s.zoomLevel);

  const [waitABitMore, setWaitABitMore] = useState(false);

  const [userDefinedMaxNumberOfPages, setUserDefinedMaxNumberOfPages] =
    useLocalStorage<number>(
      localStorageKeys.userDefinedMaxNumberOfPages,
      defaultSettings.userDefinedMaxNumberOfPages
    );

  useEffect(() => {
    if (maxNbPages !== userDefinedMaxNumberOfPages) {
      setMaxNbPages(userDefinedMaxNumberOfPages);
    }
  }, [maxNbPages, userDefinedMaxNumberOfPages]);

  useEffect(() => {
    if (isConfigReady) {
      setCurrentNbPanelsPerPage(config.nbPanelsPerPage);
      setMaxNbPanelsPerPage(config.nbPanelsPerPage);
    }
  }, [JSON.stringify(config), isConfigReady]);

  useEffect(() => {
    if (!prompt) {
      return;
    }

    startTransition(async () => {
      setWaitABitMore(false);
      setGeneratingStory(true);

      const [stylePrompt, userStoryPrompt] = prompt
        .split("||")
        .map((x) => x.trim());

      let limitedStylePrompt = stylePrompt.trim().slice(0, 77).trim();
      if (limitedStylePrompt.length !== stylePrompt.length) {
        console.log(
          "Sorry folks, the style prompt was cut to:",
          limitedStylePrompt
        );
      }

      const lightPanelPromptPrefix = joinWords(
        preset.imagePrompt(limitedStylePrompt)
      );

      const degradedPanelPromptPrefix = joinWords([
        ...preset.imagePrompt(limitedStylePrompt),
        userStoryPrompt,
      ]);

      let existingPanels: GeneratedPanel[] = [];
      const newPanelsPrompts: string[] = [];
      const newCaptions: string[] = [];
      const nbPanelsToGenerate = 2;

      for (
        let currentPanel = 0;
        currentPanel < currentNbPanels;
        currentPanel += nbPanelsToGenerate
      ) {
        try {
          const candidatePanels = await getStoryContinuation({
            preset,
            stylePrompt,
            userStoryPrompt,
            nbPanelsToGenerate,
            maxNbPanels,
            existingPanels,
          });
          console.log("LLM generated some new panels:", candidatePanels);

          existingPanels.push(...candidatePanels);

          console.log(
            `Converting the ${nbPanelsToGenerate} new panels into image prompts..`
          );

          const startAt = currentPanel;
          const endAt = currentPanel + nbPanelsToGenerate;
          for (let p = startAt; p < endAt; p++) {
            newCaptions.push(existingPanels[p]?.caption.trim() || "...");
            const newPanel = joinWords([
              existingPanels[p]?.instructions
                ? lightPanelPromptPrefix
                : degradedPanelPromptPrefix,

              existingPanels[p]?.instructions,
            ]);
            newPanelsPrompts.push(newPanel);

            console.log(`Image prompt for panel ${p} => "${newPanel}"`);
          }
          setCaptions(newCaptions);
          setPanels(newPanelsPrompts);

          setGeneratingStory(false);
        } catch (err) {
          console.log("failed to generate the story, aborting here");
          setGeneratingStory(false);
          break;
        }
        if (currentPanel > currentNbPanels / 2) {
          console.log("good, we are half way there, hold tight!");
        }
      }
    });
  }, [prompt, preset?.label, currentNbPanels, maxNbPanels]);

  return (
    <div
      style={{
        width: `${zoomLevel}%`,
      }}
    >
      {Array(currentNbPages)
        .fill(0)
        .map((_, i) => (
          <Page key={i} page={i} />
        ))}
    </div>
  );
}
