"use client";

import { useContext } from "react";
import { LuLightbulb, LuPaintbrush, LuSparkles } from "react-icons/lu";
import { ActiveCardContext } from "./ActiveCardContext";

export function TutorialAi() {
  const { activeCard } = useContext(ActiveCardContext);

  return (
    <div className="px-16 py-10 h-[100vh] text-black">
      <div
        className={
          activeCard === 3
            ? "h-full flex items-center justify-center"
            : "hidden"
        }
      >
        <p className="w-1/2 font-syne font-bold text-4xl px-32 text-wrap">
          AI can do the work for you!
        </p>
        <div className="w-1/2 flex flex-col items-center justify-center space-y-8">
          <div className="flex items-center space-x-4 text-2xl">
            <LuLightbulb className="text-4xl" />
            <div>
              <p className="font-bold text-3xl">Give prompt</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-2xl">
            <LuPaintbrush className="text-4xl" />
            <div>
              <p className="font-bold text-3xl">Choose a style</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-2xl">
            <LuSparkles className="text-4xl" />
            <div>
              <p className="font-bold text-3xl">Witness the Magic</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
