"use client";

import { PresetName } from "@/constants/presets";
import { useStore } from "@/components/render/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import { LuSend } from "react-icons/lu";

export function Prompt({
  draftPreset,
  setDraftPreset,
}: {
  draftPreset: PresetName;
  setDraftPreset: (preset: PresetName) => void;
}) {
  const preset = useStore((state) => state.preset);
  const prompt = useStore((state) => state.prompt);
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

  const [draftPromptA, setDraftPromptA] = useState(lastDraftPromptA);
  const [draftPromptB, setDraftPromptB] = useState(lastDraftPromptB);
  const draftPrompt = `${draftPromptA}||${draftPromptB}`;

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
    if (!isBusy && (promptChanged || presetChanged)) {
      generate(draftPrompt, draftPreset);
    }
  };

  return (
    <div className="flex flex-row flex-grow w-full">
      <div className="flex flex-row flex-grow w-full">
        <Input
          placeholder="Story (eg. detective dog)"
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
          placeholder="Style (eg 'rain, shiba')"
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
  );
}
