import { z } from "zod";

export const createUserSchema = z
  .object({
    first_name: z
      .string({ required_error: "First name is required" })
      .nonempty("First name is required"),
    last_name: z
      .string({ required_error: "Last name is required" })
      .nonempty("Last name is required"),
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email address"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters long"),
  })
  .strict();

export const updateUserSchema = createUserSchema.partial();
