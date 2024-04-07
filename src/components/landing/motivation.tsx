"use client";

import { useContext } from "react";
import { ActiveCardContext } from "./ActiveCardContext";

export function Motivation() {
  const { activeCard } = useContext(ActiveCardContext);

  return (
    <div className="p-16 h-[100vh]">
      <div
        className={
          activeCard === 1
            ? "h-full flex flex-col items-center justify-between"
            : "hidden"
        }
      >
        <p className="font-syne font-bold text-[3vw]">
          Why Use Panelooza?
        </p>
        <div className="flex flex-col">
          <div className="text-[1.5vw]">
            <p className="font-bold">1. Fast and Efficient Storyboarding</p>
            <p>
              Got a deadline coming up? Our AI can help you speed up the
              storyboarding process, making it faster and more efficient.
            </p>
          </div>
          <div className="text-[1.5vw]">
            <p className="font-bold">2. Get Inspired</p>
            <p>
              Experiencing a creative block? Get inspiration from our community
              gallery and see what others are creating.
            </p>
          </div>
          <div className="text-[1.5vw]">
            <p className="font-bold">3. Save Money</p>
            <p>
              Broke after paying for background artists? Our AI can generate
              backgrounds and handle other repetitive tasks, saving you money.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <p className="text-[2vw] font-bold ">
            Dont be a sad mangaka. Try our AI Comic Strip Generator today!
          </p>
          <img src="images/sad.png" alt="comic strip" className="w-[10vw] absolute right-4 bottom-4" />
        </div>
      </div>
    </div>
  );
}
