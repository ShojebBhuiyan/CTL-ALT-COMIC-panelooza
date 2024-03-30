"use client";

import { PresetName } from "@/app/engine/presets";
import { useStore } from "@/app/store";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { Buttons } from "./buttons";
import { Prompt } from "./prompt";

export function Menu({
  draftPreset,
  setDraftPreset,
}: {
  draftPreset: PresetName;
  setDraftPreset: (preset: PresetName) => void;
}) {
  const setShowCaptions = useStore((state) => state.setShowCaptions);
  const showCaptions = useStore((state) => state.showCaptions);

  return (
    <div className="print:hidden">
      <div className="flex justify-between items-center space-x-2">
        <div className="flex flex-row items-center space-x-3">
          <Label>
            <span className="hidden md:inline">Caption</span>
            <span className="inline md:hidden">Cap.</span>
          </Label>
          <Switch checked={showCaptions} onCheckedChange={setShowCaptions} />
        </div>
        <Buttons />
      </div>
      <Prompt draftPreset={draftPreset} setDraftPreset={setDraftPreset} />
    </div>
  );
}
