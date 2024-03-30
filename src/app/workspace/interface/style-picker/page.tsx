"use client";

import { PresetName, nonRandomPresets, presets } from "@/app/engine/presets";
import { predictStyle } from "@/app/queries/predictStyle";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";

export default function Page({
  draftPreset,
  setDraftPreset,
}: {
  draftPreset: PresetName;
  setDraftPreset: (preset: PresetName) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="min-w-fit h-screen bg-gray-200 p-4 flex flex-col overflow-y-auto print:hidden">
      <p className="text-lg text-center font-bold mb-4">Styles</p>
      <button
        className="bg-black text-white px-4 py-2 mb-4"
        onClick={() => fileInputRef.current?.click()}
      >
        <FiUpload className="inline-block me-2" />
        Upload your own
        <input
          ref={fileInputRef}
          type="file"
          name="file-input"
          accept="image/*"
          className="hidden"
        />
      </button>
      <button
        onClick={async () => {
          let file;
          if (fileInputRef.current && fileInputRef.current.files) {
            file = fileInputRef.current.files[0];
          }
          if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
              const base64Image = reader.result as string;
              await predictStyle({ image: base64Image });
            };
            reader.readAsDataURL(file);
          }
        }}
      >
        Predict Style
      </button>
      
      <div className="grid grid-cols-2 gap-2 justify-items-center">
        {nonRandomPresets.map((key) => {
          const [loaded, setLoaded] = useState(false);
          useEffect(() => {
            const img = new Image();
            img.src = presets[key].thumbnail;
            img.onload = () => setLoaded(true);
          }, [key]);
          return (
            <div
              key={key}
              className={`group relative h-32 w-32 cursor-pointer`}
              onClick={() => {
                setDraftPreset(key as PresetName);
              }}
            >
              <img
                className={`h-32 w-32 rounded-none ${
                  draftPreset === key
                    ? "brightness-50"
                    : "transition-all duration-300 group-hover:brightness-50"
                }`}
                src={presets[key].thumbnail}
                onLoad={() => setLoaded(true)}
                style={{ display: loaded ? "block" : "none" }}
              />
              {!loaded && <Skeleton className="h-32 w-32 rounded-none" />}
              <p
                className={`absolute inset-0 flex items-center justify-center text-center text-white ${
                  draftPreset === key
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100 transition-all duration-300"
                }`}
              >
                {presets[key].label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
