"use client";

import { ReactNode } from "react";

import { useStore } from "@/app/store";
import { cn } from "@/lib/utils";

export function Grid({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const zoomLevel = useStore((state) => state.zoomLevel);

  return (
    <div
      className={cn(`w-full h-full grid`, className)}
      style={{
        gap: `${(zoomLevel / 100) * 0.7}vw`,
      }}
    >
      {children}
    </div>
  );
}
