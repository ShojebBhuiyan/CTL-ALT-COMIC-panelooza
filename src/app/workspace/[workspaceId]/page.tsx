"use client";

import {
  PresetName,
  defaultPreset
} from "@/app/engine/presets";
import { useStore } from "@/app/store";
import Strip from "@/components/workspace/strip";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Menu } from "../interface/menu";
import StylePicker from "../interface/style-picker/page";
import { Zoom } from "../interface/zoom";

export default function Canvas({
  params: { ownerId },
}: {
  params: { ownerId: string };
}) {
  const preset = useStore((state) => state.preset);
  const searchParams = useSearchParams();
  const requestedPreset =
    (searchParams?.get("preset") as PresetName) || defaultPreset;
  const [draftPreset, setDraftPreset] = useState<PresetName>(requestedPreset);

  return (
    <div className="bg-gray-100 text-black flex p-4">
      <StylePicker draftPreset={draftPreset} setDraftPreset={setDraftPreset} />
      <div className="flex-grow bg-gray-100 py-4 px-32 flex flex-col">
        <Menu draftPreset={draftPreset} setDraftPreset={setDraftPreset} />
        <div className="w-full flex justify-center">
          <Strip />
        </div>
      </div>
      <Zoom />
      <div className="w-1/12 bg-gray-200 p-4"></div>
    </div>
  );
}
