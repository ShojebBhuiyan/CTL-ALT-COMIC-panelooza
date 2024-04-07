"use server";

import { v4 as uuidv4 } from "uuid";

import { RenderedScene } from "@/types/ai";

const serverOpenaiApiKey = `${process.env.AUTH_OPENAI_API_KEY || ""}`;
const serverOpenaiApiBaseUrl = `${
  process.env.RENDERING_OPENAI_API_BASE_URL || "https://api.openai.com/v1"
}`;
const serverOpenaiApiModel = `${
  process.env.RENDERING_OPENAI_API_MODEL || "dall-e-3"
}`;

export async function newRender({
  prompt,
  width,
  height,
}: {
  prompt: string;
  width: number;
  height: number;
}) {
  if (!prompt) {
    const error = `cannot call the rendering API without a prompt, aborting..`;
    console.error(error);
    throw new Error(error);
  }

  let defaulResult: RenderedScene = {
    renderId: "",
    status: "error",
    assetUrl: "",
    alt: prompt || "",
    maskUrl: "",
    error: "failed to fetch the data",
    segments: [],
  };
  let openaiApiKey = serverOpenaiApiKey;
  let openaiApiModel = serverOpenaiApiModel;

  try {
    const size =
      width > height ? "1792x1024" : width < height ? "1024x1792" : "1024x1024";
    const res = await fetch(`${serverOpenaiApiBaseUrl}/images/generations`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: openaiApiModel,
        prompt,
        n: 1,
        size,
        // quality: "standard",
      }),
      cache: "no-store",
    });

    if (res.status !== 200) {
      throw new Error("Failed to fetch data");
    }

    const response = (await res.json()) as { data: { url: string }[] };
    return {
      renderId: uuidv4(),
      status: "completed",
      assetUrl: response.data[0].url || "",
      alt: prompt,
      error: "",
      maskUrl: "",
      segments: [],
    } as RenderedScene;
  } catch (err) {
    console.error(err);
    return defaulResult;
  }
}

export async function getRender(renderId: string) {
  if (!renderId) {
    const error = `cannot call the rendering API without a renderId, aborting..`;
    console.error(error);
    throw new Error(error);
  }
}
