import { db } from "@/lib/db";

export async function createStyle(
  userId: string,
  label: string,
  thumbnail: string,
  family: string,
  color: string,
  llmPrompt: string,
  imagePrompt: string[],
  negativePrompt: string[]
) {
  try {
    const style = await db.style.create({
      data: {
        label,
        thumbnail,
        family,
        color,
        llmPrompt,
        imagePrompt: {
          set: imagePrompt,
        },
        negativePrompt: {
          set: negativePrompt,
        },
        user: {
          connect: {
            id: userId,
          },
        },
        isDefault: false,
      },
    });

    return style;
  } catch (error) {
    console.error(error);
  }
}

export async function getStylesByUser(userId: string) {
  try {
    const styles = await db.style.findMany({
      where: {
        userId,
      },
    });

    return styles;
  } catch (error) {
    console.error(error);
  }
}

export async function getStyleById(id: string) {
  try {
    const style = await db.style.findUnique({
      where: {
        id,
      },
    });

    return style;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteStyle(id: string) {
  try {
    const style = await db.style.delete({
      where: {
        id,
      },
    });

    return style;
  } catch (error) {
    console.error(error);
  }
}
