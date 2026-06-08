import z from "zod";

export const ReviewFilterFormSchema = z.object({
  search: z.string().optional(),
  status: z.enum(["publish", "unpublish"]).optional(),
  user: z.string().optional(),
  product: z.string().optional(),
});

export const ReviewUpdateFormSchema = z.object({
  rating: z.number().int().min(1).max(5),
  content: z.string().optional(),
});

export type ReviewFilterFormValues = z.infer<typeof ReviewFilterFormSchema>;
export type ReviewUpdateFormValues = z.infer<typeof ReviewUpdateFormSchema>;
