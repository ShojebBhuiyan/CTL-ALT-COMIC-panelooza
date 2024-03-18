"use client";

import { useContext } from "react";
import { ActiveCardContext } from "./ActiveCardContext";

export function Review() {
  const { activeCard } = useContext(ActiveCardContext);

  return (
    <div className="px-16 py-10 h-[100vh]">
      <div
        className={
          activeCard === 5
            ? "h-full flex flex-col items-center justify-center"
            : "hidden"
        }
      >
        <p className="font-syne font-bold text-4xl mt-2">
          What artists saying about us
        </p>
        <div className="flex items-center justify-center mt-10">
          <img src="bubbles.svg" alt="speech-bubbles" className="h-80" />
        </div>
      </div>
    </div>
  );
}
