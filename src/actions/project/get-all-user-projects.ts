"use server";

import { getProjectsByUser } from "@/data/project";
import { unstable_cache } from "next/cache";

export async function getAllUserProjects(userId: string) {
  unstable_cache(
    async (userId) => {
      const projects = await getProjectsByUser(userId);
      return projects;
    },
    ["projects"],
    {
      tags: ["projects"],
      revalidate: false,
    }
  );
  const projects = getProjectsByUser(userId);

  return projects;
}
