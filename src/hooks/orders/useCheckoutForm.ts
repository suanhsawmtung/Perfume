import { useCartStore } from "@/stores/cart.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const createOrderSchema = z.object({
    items: z.array(z.object({
        productVariantId: z.number().int().positive(),
        quantity: z.number().int().min(1).max(32767),
    })).min(1),
});

export function useCheckoutForm() {

    const { items } = useCartStore();

    const form = useForm<z.infer<typeof createOrderSchema>>({
        resolver: zodResolver(createOrderSchema),
        defaultValues: {
            items,
        },
    });

    return {
        form,
    }
}