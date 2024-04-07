"use client"

import { getInitialRenderedScene } from "@/actions/render/get-initial-rendered-scene";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { LayoutProps, RenderedScene, RenderedSceneStatus } from "@/types/ai";
import { useEffect, useState } from "react";
import { Panel } from "../panel";

export function Layout0({ projectId, page, nbPanels }: LayoutProps) {
  
  const [scenes, setScenes] = useState<RenderedScene[] | undefined>([]);

  useEffect(() => {
    getInitialRenderedScene(projectId).then((data) => {
      if (data) {
        const updatedData = data.map(item => ({
          ...item,
          status: item.status as RenderedSceneStatus,
          segments: [], 
        }));
        setScenes(updatedData);
      }
    });
  }, [projectId]);

  return (
    <ResizablePanelGroup direction="vertical" className="border">
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50}>
            <Panel
              savedUrl={scenes?.at(0)?.assetUrl}
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
              savedUrl={scenes?.at(1)?.assetUrl}
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
              savedUrl={scenes?.at(2)?.assetUrl}
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
              savedUrl={scenes?.at(3)?.assetUrl}
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