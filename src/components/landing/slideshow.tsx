"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { useContext } from "react";
import { ActiveCardContext } from "./ActiveCardContext";

export function Slideshow() {
  const { activeCard } = useContext(ActiveCardContext);

  return (
    <div className="p-16 h-[100vh] bg-white">
      <div
        className={
          activeCard === 2
            ? "h-full flex flex-col items-center justify-between"
            : "hidden"
        }
      >
        <p className="font-syne font-bold text-[3vw] text-black">
          Many styles to choose from
        </p>
        {/* <div className="bg-red h-full flex items-center"> */}
        <InfiniteMovingCards direction="right" speed="normal" /></div>
      {/* </div> */}
    </div>
  );
}
