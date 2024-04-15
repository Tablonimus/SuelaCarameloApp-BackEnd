import { z } from "zod";

export const noticiasSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  subtitle: z
    .string()
    .optional(),
  password: z
    .string()
    .optional(),
});