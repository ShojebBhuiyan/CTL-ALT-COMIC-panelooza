"use server";

import { updateProfile } from "@/data/user";

export async function updateUser(
  id: string,
  name: string,
  email: string,
  username: string
) {
  const user = await updateProfile(id, name, email, username);

  return user;
}
