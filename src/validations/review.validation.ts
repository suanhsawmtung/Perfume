import z from "zod";

export const ReviewFilterFormSchema = z.object({
  search: z.string().optional(),
  status: z.enum(["publish", "unpublish"]).optional(),
  user: z.string().optional(),
  product: z.string().optional(),
});

export const ReviewFormSchema = z.object({
  rating: z.number().int().min(1, "Please select a rating").max(5),
  content: z.string().optional(),
});

export type ReviewFilterFormValues = z.infer<typeof ReviewFilterFormSchema>;
export type ReviewFormValues = z.infer<typeof ReviewFormSchema>;
