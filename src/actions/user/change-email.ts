"use server";

import { updateEmail } from "@/data/user";

export async function changeEmail(id: string, email: string) {
  const user = await updateEmail(id, email);
  return user;
}
