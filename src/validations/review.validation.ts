import z from "zod";

export const ReviewFilterFormSchema = z.object({
  search: z.string().optional(),
  status: z.enum(["publish", "unpublish"]).optional(),
  user: z.string().optional(),
  product: z.string().optional(),
});

export type ReviewFilterFormValues = z.infer<typeof ReviewFilterFormSchema>;
