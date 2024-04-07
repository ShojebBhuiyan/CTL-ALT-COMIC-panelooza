"use client";

import { useEffect, useRef } from "react";

import { useStore } from "@/components/render/store";
import {
  Layout0,
} from "@/components/workspace/layouts/layout-0";
import { cn } from "@/lib/utils";

export function Page({ page }: { page: number }) {
  const zoomLevel = useStore((state) => state.zoomLevel);

  const LayoutElement = Layout0;
  const aspectRatio =  "aspect-[250/297]";

  const currentNbPages = useStore((s) => s.currentNbPages);
  const currentNbPanelsPerPage = useStore((s) => s.currentNbPanelsPerPage);
  const currentNbPanels = currentNbPanelsPerPage;
  const setPage = useStore((state) => state.setPage);
  const pageRef = useRef<HTMLDivElement>(null);
  let url = "";
  if (typeof window !== "undefined") {
    const t = new URL(window.location.href);
    url = t.pathname.split("/").pop() || "";
  }

  useEffect(() => {
    const element = pageRef.current;
    if (!element) {
      return;
    }
    setPage(element);
  }, [pageRef.current]);
  return (
    <div
      ref={pageRef}
      className={cn(
        `w-full`,
        `print:w-screen`,
        `print:h-fit`,
        `print:absolute`,
        `print:left-0`
      )}
      style={{
        padding: `${Math.round((zoomLevel / 100) * 16)}px`,
      }}
    >
      <div
        id="page"
        className={cn(
          aspectRatio,
          `transition-all duration-100 ease-in-out`,
          `border border-stone-200`,
          `shadow-2xl`,
          `print:shadow-none`,
          `print:border-0`
        )}
        style={{
          padding: `${Math.round((zoomLevel / 100) * 16)}px`,
        }}
      >
        <LayoutElement projectId={url} page={page} nbPanels={currentNbPanels} />
      </div>
      {currentNbPages > 1 && (
        <p className="w-full text-center pt-4 font-sans text-2xs font-semibold text-stone-600">
          Page {page + 1}
        </p>
      )}
    </div>
  );
}
