"use server";

import { deleteStyle } from "@/data/style";
import { revalidateTag } from "next/cache";

export async function deleteSelectedStyle(id: string) {
  const style = await deleteStyle(id);

  revalidateTag("styles");

  return style;
}
