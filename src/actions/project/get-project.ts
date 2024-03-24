"use server";

import { getProjectById } from "@/data/project";

export async function getProject(id: string) {
  const project = await getProjectById(id);

  return project;
}
