import z from "zod";

export const orderFilterFormSchema = z.object({
  search: z.string().optional(),
  status: z.enum(["PENDING", "ACCEPTED", "REJECTED", "CANCELLED", "DONE", "SHIPPED", "DELIVERED"]).optional(),
  paymentStatus: z.enum(["UNPAID", "PAID", "FAILED", "REFUNDED", "PARTIALLY_REFUNDED", "PARTIALLY_PAID"]).optional(),
  source: z.enum(["ADMIN", "CUSTOMER"]).optional(),
});

export const orderFormSchema = z.object({
  customerName: z.string().min(2, "Customer name is required"),
  customerPhone: z.string().min(10, "Valid phone number is required"),
  customerAddress: z.string().min(5, "Valid address is required"),
  customerNotes: z.string().optional(),
  rejectedReason: z.string().optional(),
  cancelledReason: z.string().optional(),
  status: z.enum(["PENDING", "ACCEPTED", "REJECTED", "CANCELLED", "DONE", "SHIPPED", "DELIVERED"]),
  source: z.enum(["ADMIN", "CUSTOMER"]),
  items: z.array(z.object({
    itemId: z.number(),
    itemType: z.enum(["PRODUCT_VARIANT", "BUNDLE"]),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    price: z.number().min(0, "Price must be non-negative"),
  })).min(1, "Add at least one item to the order"),
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;