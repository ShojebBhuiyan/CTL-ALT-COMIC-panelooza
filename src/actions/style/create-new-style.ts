"use server";

import { predictStyle } from "@/app/queries/predictStyle";
import { createStyle } from "@/data/style";
import { revalidateTag } from "next/cache";

export async function createNewStyle(
  label: string,
  userId: string,
  filename: string,
  thumbnail: string
) {
  try {
    if (thumbnail) {
      const prompt = await predictStyle({ image: thumbnail });
      try {
        const style = await createStyle(
          userId,
          label,
          filename,
          prompt.family,
          prompt.color,
          prompt.llmPrompt,
          prompt.imagePrompt,
          prompt.negativePrompt
        );

        revalidateTag("styles");
        return style;
      } catch (error) {
        console.error("Couldn't create style", error);
      }
    }
  } catch (error) {
    console.error("Unable to predict style of the image", error);
  }
}
