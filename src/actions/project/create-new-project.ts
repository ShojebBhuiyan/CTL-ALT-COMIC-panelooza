"use server";

import { createProject } from "@/data/project";
import { revalidateTag } from "next/cache";

export async function createNewProject(
  name: string,
  userId: string,
  description?: string
) {
  const project = await createProject(userId, name, description);

  revalidateTag("projects");

  return project;
}
