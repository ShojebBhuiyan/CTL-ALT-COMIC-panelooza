import { db } from "@/lib/db";

export async function createStyle(
  userId: string,
  label: string,
  thumbnail: string
) {
  try {
    const style = await db.style.create({
      data: {
        label,
        thumbnail,
        user: {
          connect: {
            id: userId,
          },
        },
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
