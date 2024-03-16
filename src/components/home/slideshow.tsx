"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function Slideshow() {
  return (
    <div className="p-16 flex flex-col antialiased bg-white items-center justify-center relative overflow-hidden">
      <p className="text-4xl font-karla mb-4">Many styles to choose from</p>
      <InfiniteMovingCards items={dummy} direction="right" speed="normal" />
    </div>
  );
}

const dummy = [
  {
    name: "Superhero",
    picture: "/logo.png",
  },
  {
    name: "Retro",
    picture: "/logo.png",
  },
  {
    name: "3D",
    picture: "/logo.png",
  },
  {
    name: "Anime",
    picture: "/logo.png",
  },
];
