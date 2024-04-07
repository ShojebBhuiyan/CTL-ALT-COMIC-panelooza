"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { pick } from "@/lib/pick";
import { Panel } from "../panel";
import { LayoutProps } from "@/types/ai";
import { getInitialRenderedScene } from "@/actions/render/get-initial-rendered-scene";
import { useState, useEffect } from "react";

export function Layout0({ projectId, page, nbPanels }: LayoutProps) {
  
  const [scenes, setScenes] = useState<{ assetUrl: string }[] | null>(null);

  useEffect(() => {
    getInitialRenderedScene(projectId).then((data) => {
      setScenes(data);
    });
  }, [projectId]);

  return (
    <ResizablePanelGroup direction="vertical" className="border">
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50}>
            <Panel
              // savedUrl={scenses?.at(0)?.assetUrl}
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
              // savedUrl={scenses?.at(1)?.assetUrl}
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
              // savedUrl={scenses?.at(2)?.assetUrl}
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
              // savedUrl={scenses?.at(3)?.assetUrl}
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