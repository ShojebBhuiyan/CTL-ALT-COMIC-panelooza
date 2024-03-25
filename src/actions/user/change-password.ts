"use server";

import { checkPassword, updatePassword } from "@/data/user";

export async function changePassword(
  id: string,
  currentPassword: string,
  password: string
) {
  const passwordsMatch = await checkPassword(id, currentPassword);

  if (passwordsMatch) {
    const user = updatePassword(id, password);
    return user;
  } else {
    throw new Error("Wrong current password!");
  }
}
