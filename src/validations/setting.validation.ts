import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  phone: z.string().optional().nullable(),
  image: z.any().optional(), // For file upload
});

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .trim()
      .min(1, "Password is required!")
      .min(8, "Password must be between 8 and 12 characters")
      .max(12, "Password must be between 8 and 12 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const setPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .trim()
      .min(1, "Password is required!")
      .min(8, "Password must be between 8 and 12 characters")
      .max(12, "Password must be between 8 and 12 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
