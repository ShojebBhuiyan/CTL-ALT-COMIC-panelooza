"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { CreateStylePopup } from "./create-style-popup";
import { PresetName, presets } from "@/constants/presets";

export default function StylePicker({
  draftPreset,
  setDraftPreset,
  userId,
}: {
  draftPreset: PresetName;
  setDraftPreset: (preset: PresetName) => void;
  userId: string;
}) {
  const allPresets = Object.keys(presets).filter((p) => p !== "random");
  const [isOpen, setOpen] = useState(false);

  function Preset({
    presetKey,
    draftPreset,
    setDraftPreset,
  }: {
    presetKey: string;
    draftPreset: PresetName;
    setDraftPreset: (preset: PresetName) => void;
  }) {
    const [loaded, setLoaded] = useState(false);

    return (
      <div
        key={presetKey}
        className={`group relative h-32 w-32 cursor-pointer`}
        onClick={() => {
          setDraftPreset(presetKey as PresetName);
        }}
      >
        <img
          className={`h-32 w-32 rounded-none ${
            draftPreset === presetKey
              ? "brightness-50"
              : "transition-all duration-300 group-hover:brightness-50"
          }`}
          src={`/api/image?fileName=${presets[presetKey].thumbnail}`}
          onLoad={() => setLoaded(true)}
          style={{ display: loaded ? "block" : "none" }}
        />
        {!loaded && <Skeleton className="h-32 w-32 rounded-none" />}
        <p
          className={`absolute inset-0 flex items-center justify-center text-center text-white ${
            draftPreset === presetKey
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100 transition-all duration-300"
          }`}
        >
          {presets[presetKey].label}
        </p>
      </div>
    );
  }

  return (
    <div className="min-w-fit h-screen bg-gray-200 p-4 flex flex-col overflow-y-auto print:hidden">
      <p className="text-lg text-center font-bold mb-4">Styles</p>
      <button
        className="bg-black text-white px-4 py-2 mb-4"
        onClick={() => setOpen(true)}
      >
        <FiUpload className="inline-block me-2" />
        Create your own
      </button>
      <CreateStylePopup isOpen={isOpen} setOpen={setOpen} userId={userId} />

      <div className="grid grid-cols-2 gap-2 justify-items-center">
        {allPresets.map((presetKey, key) => (
          <Preset
            key={key}
            presetKey={presetKey}
            draftPreset={draftPreset}
            setDraftPreset={setDraftPreset}
          />
        ))}
      </div>
    </div>
  );
}
