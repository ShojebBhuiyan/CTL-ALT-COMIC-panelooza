"use server";

import { db } from "@/lib/db";

export async function getInitialRenderedScene(projectId: string) {
  try {
    const scenes = await db.renderedScene.findMany({
      where: {
        projectId,
      },
      take: 4,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return scenes;

  } catch (error) {
    console.error("Couldn't get initial rendered scene", error);
  }
}