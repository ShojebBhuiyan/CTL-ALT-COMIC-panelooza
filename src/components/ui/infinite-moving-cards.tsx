"use client";

import { nonRandomPresets, presets } from "@/constants/presets";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    nonRandomPresets.forEach((presetKey) => {
      fetch(`/api/image?fileName=${presets[presetKey].thumbnail}`)
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          setImageUrls((prevUrls) => ({ ...prevUrls, [presetKey]: url }));
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
    });
  }, []);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const colors = [
    "var(--red-secondary)",
    "var(--yellow-secondary)",
    "var(--blue-secondary)",
    "var(--magenta-secondary)",
    "var(--green-secondary)",
    "var(--violet-secondary)",
  ];

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("scroller relative z-20  max-w-7xl", className)}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {nonRandomPresets.map((item, idx) => (
          <li
            className="w-64  relative px-8 py-6 drop-shadow-[5px_5px_0px_rgba(0,0,0,1)]"
            style={{
              background: colors[idx % colors.length],
              padding: "10px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            }}
            key={presets[item].label}
          >
            <div className=" p-2">
              <img
                src={imageUrls[item]}
                alt={presets[item].label}
                className="w-64 h-64 object-cover"
              />
              <p className="mt-6 font-bold text-white text-center">
                {presets[item].label}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
