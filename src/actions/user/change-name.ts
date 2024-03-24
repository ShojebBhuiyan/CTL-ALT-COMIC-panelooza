"use server";

import { updateName } from "@/data/user";

export async function changeName(id: string, name: string) {
  const user = updateName(id, name);
  return user;
}
