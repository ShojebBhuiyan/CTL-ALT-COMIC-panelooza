import { z } from "zod";

export const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const SignupSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one letter, one number, and one special character"
      ),
    confirmPassword: z.string(),
    name: z.string().min(1, {
      message: "Name is required",
    }),
    username: z.string().min(1, {
      message: "Username is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export const PasswordSchema = z
  .object({
    currentPassword: z.string().min(1, {
      message: "Password is required",
    }),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one letter, one number, and one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export const AccountSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  username: z.string().min(1, {
    message: "Username is required",
  }),
  email: z.string().email(),
});

export const ProjectSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().min(1).optional(),
});
