"use server";

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { SignupSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { z } from "zod";

export async function signup(
  values: z.infer<typeof SignupSchema>
): Promise<{ error?: string; success?: string }> {
  const validatedFields = SignupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid credentials!" };
  }

  const { email, password, name, username } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "User already exists!" };
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      username,
    },
  });

  return { success: "Success!" };
}
