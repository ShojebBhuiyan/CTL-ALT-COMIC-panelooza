"use client";

import { useContext } from "react";
import { LuGem, LuPalette, LuWrench } from "react-icons/lu";
import { ActiveCardContext } from "./ActiveCardContext";

export function TutorialManual() {
  const { activeCard } = useContext(ActiveCardContext);

  return (
    <div className="px-16 py-10 h-[100vh]">
      <div
        className={
          activeCard === 4
            ? "h-full flex flex-col items-center justify-center"
            : "hidden"
        }
      >
        <p className="font-syne font-bold text-4xl mt-4 mb-auto">
          Or, you can do yourself with...
        </p>
        <div className="flex items-center justify-between mb-16">
          <div className="px-24 grid grid-cols-2 gap-5 text-wrap">
            <div className="flex items-center justify-center">
              <LuPalette className="text-4xl mr-2" />
              <p className="font-bold text-xl">Color palette</p>
            </div>
            <div className="flex items-center justify-center">
              <LuPalette className="text-4xl mr-2" />
              <p className="font-bold text-xl">Color palette</p>
            </div>
            <div className="flex items-center justify-center">
              <LuWrench className="text-4xl mr-2" />
              <p className="font-bold text-xl">Your very own toolbox</p>
            </div>
            <div className="flex items-center justify-center">
              <LuGem className="text-4xl mr-2" />
              <p className="font-bold text-xl">
                Huge library of shapes and components
              </p>
            </div>
          </div>
          <p className="text-center text-3xl font-bold">
            Start creating your own comic strips or collaborate with your
            coworkers!
          </p>
        </div>
      </div>
    </div>
  );
}
