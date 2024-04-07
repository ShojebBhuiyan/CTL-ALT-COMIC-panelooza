"use server";

import { getStyleById } from "@/data/style";

export async function getStyle(id: string) {
  const style = await getStyleById(id);

  return style;
}
