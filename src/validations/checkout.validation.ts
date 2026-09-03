import { z } from "zod";

export const checkoutOrderItemSchema = z.object({
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

export type CheckoutOrderItemInput = z.infer<typeof checkoutOrderItemSchema>;

export const checkoutSchema = z.object({
    customerName: z.string().trim().min(2, "Customer name is required"),
    customerPhone: z.string().trim().min(10, "Valid phone number is required"),
    customerAddress: z.string().trim().min(5, "Valid address is required"),
    customerNotes: z.string().optional(),
    items: z
        .array(checkoutOrderItemSchema)
        .min(1, "Cart must contain at least one item"),
    image: z.instanceof(File, { message: "Payment screenshot is required" }),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
