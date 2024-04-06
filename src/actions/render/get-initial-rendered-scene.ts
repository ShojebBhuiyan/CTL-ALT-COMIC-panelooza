"use server";

import { RenderedScene } from "@/types/ai";
import { db } from "@/lib/db";

export async function getInitialRenderedScene(projectId: string) {
  try {
    const scenes = await db.renderedScene.findMany({
      where: {
        projectId,
      },
    });

    if (scenes.length !== 0) return scenes;
    else
      return [
        {
          renderId: "",
          status: "pending",
          assetUrl: "",
          alt: "",
          error: "",
          maskUrl: "",
          segments: [],
        },
      ];
  } catch (error) {
    console.error("Couldn't get initial rendered scene", error);
  }
}
