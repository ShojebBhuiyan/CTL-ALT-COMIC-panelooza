"use client";

import React, { useRef , useContext } from 'react';
import { ActiveCardContext } from '@/components/landing/ActiveCardContext';
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";

export const StickyScroll = ({
  content,
}: {
  content: {
    color: string;
    content?: React.ReactNode | any;
  }[];
}) => {
  const { activeCard, setActiveCard } = useContext(ActiveCardContext);

  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => {
      const factor = -2 * (1 - index / cardLength);
      return index / (cardLength + factor);
    });
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <div ref={ref}>
      {content.map((card, index) => (
        <motion.div
          style={{
            position: "relative",
            overflow: "hidden",
          }}
          key={index}
        >
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: card.color,
              transform:
                index === activeCard ? "translateX(0)" : "translateX(-100%)",
              transition: "transform 1s ease-out",
              zIndex: 1,
            }}
          />
          <div style={{ position: "relative", zIndex: 2 }}>
            {" "}
            {card.content}
          </div>{" "}
        </motion.div>
      ))}
    </div>
  );
};
