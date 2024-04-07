"use server";

import { RenderedScene } from "@/types/ai";
import { s3Client } from "@/lib/s3client";
import { db } from "@/lib/db";

export async function saveRenderedScenes(
  renderedScenes: RenderedScene[],
  projectId: string
) {
  try {
    const response = await fetch(renderedScenes[0].assetUrl);
    const buffer = await response.arrayBuffer();

    for (const scene of renderedScenes) {
      await s3Client.putObject({
        Bucket: process.env.SPACES_NAME!,
        Key: scene.renderId,
        Body: Buffer.from(buffer),
      });
    }

    const scenes = db.renderedScene.createMany({
      data: renderedScenes.map((scene) => ({
        renderId: scene.renderId,
        status: scene.status,
        assetUrl: scene.assetUrl,
        alt: scene.alt,
        error: scene.error,
        maskUrl: scene.maskUrl,
        projectId: projectId,
        // project: {
        //   connect: {
        //     id: projectId,
        //   },
        // },
      })),
    });

    return scenes;
  } catch (error) {
    console.error("Couldn't save rendered scenes", error);
  }
}
