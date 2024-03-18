"use client";

import { useContext } from "react";
import { ActiveCardContext } from "./ActiveCardContext";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function Slideshow() {
  const { activeCard } = useContext(ActiveCardContext);

  return (
    <div className="px-16 py-10 bg-white h-[100vh]">
      <div
        className={
          activeCard === 2
            ? "h-full flex flex-col antialiased items-center justify-center relative"
            : "hidden"
        }
      >
        <p className="font-syne font-bold text-4xl mt-2 mb-16">
          Many styles to choose from
        </p>
        <InfiniteMovingCards items={dummy} direction="right" speed="normal" />
      </div>
    </div>
  );
}

const dummy = [
  {
    name: "Toon",
    picture: "/toon.webp",
  },
  {
    name: "Superhero",
    picture: "/superhero.webp",
  },
  {
    name: "Manga",
    picture: "/manga.webp",
  },
];
