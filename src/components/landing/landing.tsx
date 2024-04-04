"use client";

import { ActiveCardContext } from "@/components/landing/ActiveCardContext";
import { Hero } from "@/components/landing/hero";
import { Motivation } from "@/components/landing/motivation";
import { Pricing } from "@/components/landing/pricing";
import { Review } from "@/components/landing/review";
import { Slideshow } from "@/components/landing/slideshow";
import { TutorialAi } from "@/components/landing/tutorial-ai";
import { TutorialManual } from "@/components/landing/tutorial-manual";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { useState } from "react";

const content = [
  {
    color: "var(--black)",
    content: <Hero />,
  },
  {
    color: "var(--red)",
    content: <Motivation />,
  },
  {
    color: "var(--white)",
    content: <Slideshow />,
  },
  {
    color: "var(--green)",
    content: <TutorialAi />,
  },
  {
    color: "var(--magenta)",
    content: <TutorialManual />,
  },
  {
    color: "var(--violet)",
    content: <Review />,
  },
  {
    color: "var(--yellow)",
    content: <Pricing />,
  },
];

export default function Landing() {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <ActiveCardContext.Provider value={{ activeCard, setActiveCard }}>
      <div className="bg-black">
        <StickyScroll content={content} />
      </div>
    </ActiveCardContext.Provider>
  );
}
