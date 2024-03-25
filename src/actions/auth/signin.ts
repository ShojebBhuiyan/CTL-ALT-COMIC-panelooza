"use server";

import { signIn } from "@/auth";
import { DEFAULT_SIGNIN_REDIRECT } from "@/routes";
import { SigninSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export async function signin(
  values: z.infer<typeof SigninSchema>,
  callbackUrl?: string
) {
  const validatedFields = SigninSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid credentials!" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || `localhost:3000/${DEFAULT_SIGNIN_REDIRECT}`,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }

      throw error;
    }
  }
}
