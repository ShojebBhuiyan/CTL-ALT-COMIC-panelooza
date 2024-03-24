"use server";

import { createProject } from "@/data/project";

export async function createNewProject(
  name: string,
  description: string,
  userId: string
) {
  const project = await createProject(userId, name, description);

  return project;
}
