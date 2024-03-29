"use server";

import { createStyle } from "@/data/style";
import { revalidateTag } from "next/cache";

export async function createNewStyle(
  label: string,
  userId: string,
  thumbnail: string
) {
  const style = await createStyle(userId, label, thumbnail);

  revalidateTag("styles");

  return style;
}
