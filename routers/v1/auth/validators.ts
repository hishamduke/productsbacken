import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(6, "Password must contain minimun of 6 letters"),
});

export const signUpSchema = authSchema.transform((arg) => ({
  email: arg.email,
  passwordhash: arg.password,
}));
