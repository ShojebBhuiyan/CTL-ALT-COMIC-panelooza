"use client";

import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { Hero } from "@/components/home/hero";
import { Motivation } from "@/components/home/motivation";
import { Slideshow } from "@/components/home/slideshow";
import { Tutorial } from "@/components/home/tutorial";

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
    content: <Tutorial />,
  },
];

export default function Landing() {
  return (
    <div className="bg-black">
      <StickyScroll content={content} />
    </div>
  );
}
