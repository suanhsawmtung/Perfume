import z from "zod";

export const orderFilterFormSchema = z.object({
  search: z.string().optional(),
  status: z
    .enum([
      "PENDING",
      "ACCEPTED",
      "REJECTED",
      "CANCELLED",
      "DONE",
      "SHIPPED",
      "DELIVERED",
    ])
    .optional(),
  paymentStatus: z
    .enum([
      "UNPAID",
      "PAID",
      "FAILED",
      "REFUNDED",
      "PARTIALLY_REFUNDED",
      "PARTIALLY_PAID",
    ])
    .optional(),
  source: z.enum(["ADMIN", "CUSTOMER"]).optional(),
});

export const orderFormSchema = z.object({
  customerName: z.string().min(2, "Customer name is required"),
  customerPhone: z.string().min(10, "Valid phone number is required"),
  customerAddress: z.string().min(5, "Valid address is required"),
  customerNotes: z.string().optional(),
  rejectedReason: z.string().optional(),
  cancelledReason: z.string().optional(),
  status: z.enum([
    "PENDING",
    "ACCEPTED",
    "REJECTED",
    "CANCELLED",
    "DONE",
    "SHIPPED",
    "DELIVERED",
  ]),
  source: z.enum(["ADMIN", "CUSTOMER"]),
  items: z
    .array(
      z.object({
        itemId: z.number(),
        quantity: z.number().min(1, "Quantity must be at least 1"),
        price: z.number().min(0, "Price must be non-negative"),
      }),
    )
    .min(1, "Add at least one item to the order"),
});

export const cancelOrderSchema = z.object({
  cancelledReason: z.string().min(2, "Cancelled reason is required"),
});

export const placeOrderItemSchema = z.object({
  productVariantId: z
    .number({ error: "Product variant is required" })
    .int()
    .positive("Product variant ID must be a positive integer"),

  quantity: z
    .number({ error: "Quantity is required" })
    .int("Quantity must be a whole number")
    .min(1, "Quantity must be at least 1")
    .max(32767, "Quantity exceeds maximum (SmallInt)"),
});

export const placeOrderSchema = z.object({
  customerName: z
    .string()
    .trim()
    .min(1, "Customer name is required.")
    .max(100, "Customer name must be at most 100 characters."),

  customerPhone: z
    .string()
    .trim()
    .min(1, "Customer phone is required.")
    .max(15, "Customer phone must be at most 15 characters.")
    .regex(
      /^\+?[0-9 ]+$/,
      "Phone number can only contain numbers, +, and spaces.",
    ),

  customerAddress: z
    .string()
    .trim()
    .min(1, "Customer address is required.")
    .max(255, "Customer address must be at most 255 characters."),

  customerNotes: z
    .string()
    .trim()
    .max(500, "Customer notes must be at most 500 characters.")
    .optional(),

  items: z
    .array(
      z.object({
        productVariantId: z.number().int().positive(),

        quantity: z.number().int().positive(),
      }),
    )
    .min(1, "Order must contain at least one item."),

  image: z.instanceof(File, {
    message: "Payment screenshot is required",
  }),
});
