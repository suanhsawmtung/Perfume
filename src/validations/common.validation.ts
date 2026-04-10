import { z } from "zod";

export const nameSchema = z
  .string()
  .trim()
  .min(1, "Name is required")
  .max(52, "Name must be 52 characters or less");

export const categorySchema = z.object({
  name: nameSchema,
});

export const brandSchema = z.object({
  name: nameSchema,
});