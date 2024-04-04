"use client";

import { PresetName, addPreset, defaultPreset } from "@/constants/presets";
import Strip from "@/components/workspace/strip";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Menu } from "./menu/menu";
import { Zoom } from "./zoom";
import StylePicker from "./style-picker";

export default function Workspace({
  userId,
  styles,
}: {
  userId: string;
  styles: any[];
}) {
  const searchParams = useSearchParams();
  const requestedPreset =
    (searchParams?.get("preset") as PresetName) || defaultPreset;
  const [draftPreset, setDraftPreset] = useState<PresetName>(requestedPreset);
  addPreset(styles);

  return (
    <div className="bg-gray-100 text-black flex p-4">
      <StylePicker
        draftPreset={draftPreset}
        setDraftPreset={setDraftPreset}
        userId={userId}
      />
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
