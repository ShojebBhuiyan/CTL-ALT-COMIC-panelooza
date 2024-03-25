"use server";

import { auth } from "@/auth";

export async function getServerSession() {
  const session = await auth();

  return session;
}
