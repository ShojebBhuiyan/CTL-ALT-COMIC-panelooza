"use client";

import { Panel } from "@/app/workspace/interface/panel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { pick } from "@/lib/pick";
import { LayoutProps } from "@/types";

export function Layout0({ page, nbPanels }: LayoutProps) {
  return (
    <ResizablePanelGroup direction="vertical" className="border">
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50}>
            <Panel
              page={page}
              nbPanels={nbPanels}
              panel={0}
              width={1024}
              height={1024}
            />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <Panel
              page={page}
              nbPanels={nbPanels}
              panel={1}
              width={1024}
              height={1024}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50}>
            <Panel
              page={page}
              nbPanels={nbPanels}
              panel={2}
              width={1024}
              height={1024}
            />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <Panel
              page={page}
              nbPanels={nbPanels}
              panel={3}
              width={1024}
              height={1024}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle />
    </ResizablePanelGroup>
  );
}

export const allLayouts = {
  random: <></>,
  Layout0,
};

export const allLayoutLabels = {
  Layout0: "Grid 0",
};

// note for reference: A4 (297mm x 210mm)
export const allLayoutAspectRatios = {
  Layout0: "aspect-[250/297]",
};

export type LayoutName = keyof typeof allLayouts;

export const defaultLayout: LayoutName = "Layout0";

export type LayoutCategory = "square" | "fluid";

export const nonRandomLayouts = Object.keys(allLayouts).filter(
  (layout) => layout !== "random"
);

export const getRandomLayoutName = (): LayoutName => {
  return pick(nonRandomLayouts) as LayoutName;
};

export function getRandomLayoutNames(): LayoutName[] {
  return nonRandomLayouts.sort(() => Math.random() - 0.5) as LayoutName[];
}
