"use server";

import { updateUsername } from "@/data/user";

export async function changeUsername(id: string, username: string) {
  const user = await updateUsername(id, username);

  return user;
}
