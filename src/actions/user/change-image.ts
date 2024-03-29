"use server";

import { updateImage } from "@/data/user";

export async function changeImage(id: string, name: string) {
  const user = updateImage(id, name);
  return user;
}
