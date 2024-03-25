"use server";

import { deleteProject } from "@/data/project";
import { revalidateTag } from "next/cache";

export async function deleteSelectedProject(id: string) {
  const project = await deleteProject(id);

  revalidateTag("projects");

  return project;
}
