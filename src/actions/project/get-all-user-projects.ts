"use server";

import { getProjectsByUser } from "@/data/project";

export async function getAllUserProjects(userId: string) {
  const projects = getProjectsByUser(userId);

  return projects;
}
