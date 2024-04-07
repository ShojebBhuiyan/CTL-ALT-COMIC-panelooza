"use client";

import { useContext } from "react";
import { LuLightbulb, LuPaintbrush, LuSparkles } from "react-icons/lu";
import { ActiveCardContext } from "./ActiveCardContext";

export function TutorialAi() {
  const { activeCard } = useContext(ActiveCardContext);

  return (
    <div className="p-16 h-[100vh] text-black">
      <div
        className={
          activeCard === 3
            ? "h-full flex items-center justify-between"
            : "hidden"
        }
      >
        <p className="w-1/2 font-syne font-bold text-[4vw] px-32 text-wrap">
          AI can do the work for you!
        </p>
        <div className="w-1/2 flex flex-col items-center justify-center space-y-8 text-[2.2vw]">
          <div className="flex items-center space-x-4">
            <LuLightbulb className="" />
            <div>
              <p>Give prompt</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <LuPaintbrush />
            <div>
              <p>Choose a style</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <LuSparkles />
            <div>
              <p>Witness the Magic</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
