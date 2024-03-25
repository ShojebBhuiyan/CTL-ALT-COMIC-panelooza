import { db } from "@/lib/db";

export async function createProject(
  userId: string,
  name: string,
  description?: string
) {
  try {
    const workspace = await db.project.create({
      data: {
        name,
        description,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return workspace;
  } catch (error) {
    console.error(error);
  }
}

export async function getProjectsByUser(userId: string) {
  try {
    const projects = await db.project.findMany({
      where: {
        userId,
      },
    });

    return projects;
  } catch (error) {
    console.error(error);
  }
}

export async function getProjectById(id: string) {
  try {
    const project = await db.project.findUnique({
      where: {
        id,
      },
    });

    return project;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteProject(id: string) {
  try {
    const project = await db.project.delete({
      where: {
        id,
      },
    });

    return project;
  } catch (error) {
    console.error(error);
  }
}
