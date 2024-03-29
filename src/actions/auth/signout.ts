"use server";

import { signOut } from "@/auth";
import { getSession } from "next-auth/react";

export async function signout() {
  await signOut();
  await getSession();
}
