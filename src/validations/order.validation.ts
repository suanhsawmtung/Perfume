import z from "zod";

export const orderFilterFormSchema = z.object({
  search: z.string().optional(),
  status: z.enum(["PENDING", "ACCEPTED", "REJECTED", "CANCELLED", "DONE"]).optional(),
  paymentStatus: z.enum(["UNPAID", "PAID", "PENDING", "FAILED", "REFUNDED", "PARTIALLY_REFUNDED"]).optional(),
  source: z.enum(["ADMIN", "CUSTOMER"]).optional(),
});

export const orderFormSchema = z.object({
  customerName: z.string().min(2, "Customer name is required"),
  customerPhone: z.string().min(10, "Valid phone number is required"),
  customerAddress: z.string().min(5, "Valid address is required"),
  customerNotes: z.string().optional(),
  rejectedReason: z.string().optional(),
  cancelledReason: z.string().optional(),
  status: z.enum(["PENDING", "ACCEPTED", "REJECTED", "CANCELLED", "DONE"]),
  paymentStatus: z.enum(["UNPAID", "PAID", "PENDING", "FAILED", "REFUNDED", "PARTIALLY_REFUNDED"]),
  userId: z.number().int().positive("User selection is required"),
  source: z.enum(["ADMIN", "CUSTOMER"]),
  image: z.instanceof(File).optional(),
  items: z.array(z.object({
    itemId: z.number(),
    itemType: z.enum(["PRODUCT_VARIANT", "BUNDLE"]),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    price: z.number().min(0, "Price must be non-negative"),
  })).min(1, "Add at least one item to the order"),
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;