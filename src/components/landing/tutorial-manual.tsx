"use client";

import { useContext } from "react";
import { LuGem, LuPalette, LuWrench } from "react-icons/lu";
import { ActiveCardContext } from "./ActiveCardContext";

export function TutorialManual() {
  const { activeCard } = useContext(ActiveCardContext);

  return (
    <div className="p-16 h-[100vh]">
      <div
        className={
          activeCard === 4 ? "h-full flex flex-col items-center" : "hidden"
        }
      >
        <p className="font-syne font-bold text-[3vw]">
          Or, you can do yourself with...
        </p>
        <div className="flex h-full items-center">
          <div className="w-1/2 grid grid-cols-2 gap-5 text-center text-wrap text-[2vw]">
            <div className="flex items-center justify-center space-x-2">
              <LuPalette className="flex-shrink-0" />
              <p>Color palette</p>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <LuPalette className="flex-shrink-0" />
              <p>Color palette</p>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <LuWrench className="flex-shrink-0" />
              <p>Your very own toolbox</p>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <LuGem className="flex-shrink-0" />
              <p>Huge library of shapes and components</p>
            </div>
          </div>
          <p className="w-1/2 font-bold text-[2.5vw] px-32 text-wrap">
            Start creating your own comic strips or collaborate with your
            coworkers!
          </p>
        </div>
      </div>
    </div>
  );
}
