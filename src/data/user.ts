import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function getUserByEmail(email: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function updateName(id: string, name: string) {
  try {
    const user = await db.user.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function updateUsername(id: string, username: string) {
  try {
    const user = await db.user.update({
      where: {
        id,
      },
      data: {
        username,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function updateEmail(id: string, email: string) {
  try {
    const user = await db.user.update({
      where: {
        id,
      },
      data: {
        email,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function updateProfile(
  id: string,
  name: string,
  username: string,
  email: string
) {
  try {
    const user = await db.user.update({
      where: {
        id,
      },
      data: {
        name,
        username,
        email,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function checkPassword(id: string, password: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        password: true,
      },
    });

    const passwordsMatch = await bcrypt.compare(password, user?.password!);
    return passwordsMatch;
  } catch (error) {
    console.error(error);
  }
}

export async function updatePassword(id: string, password: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
  }
}
