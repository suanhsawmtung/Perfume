import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cancelOrderSchema } from "@/validations/order.validation";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useCancelOrder } from "@/services/order/queries/useCancelOrder";
import type { CancelOrderValues } from "@/types/order.type";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";

export function CancelOrderForm({
    cancellingOrderCode,
    setCancellingOrderCode,
    canCancel
}: {
    cancellingOrderCode: string,
    setCancellingOrderCode: (code: string | null) => void,
    canCancel: boolean,
}) {
    const cancelOrderMutation = useCancelOrder();
    const isSubmitting = cancelOrderMutation.isPending;

    const form = useForm<CancelOrderValues>({
        resolver: zodResolver(cancelOrderSchema),
        defaultValues: {
            cancelledReason: "",
        },
    });

    const onSubmit = (values: CancelOrderValues) => {
        if (!canCancel) {
            toast.error("Order cannot be cancelled", {
                position: "top-right",
                description: "Orders can only be cancelled while being prepared or processed. Once shipped, delivered, rejected, or already cancelled, cancellation is no longer available."
            })
            return
        }
        cancelOrderMutation.mutate({ code: cancellingOrderCode, data: values }, {
            onSuccess: () => {
                setCancellingOrderCode(null)
            },
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30">
                <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-medium text-red-800 dark:text-red-200">Cancel Order</h3>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-red-600 hover:bg-red-100 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/50"
                        onClick={() => {
                            setCancellingOrderCode(null)
                            // setCancelReason("")
                        }}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <FormField
                    control={form.control}
                    name="cancelledReason"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Reason for Cancellation</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Please tell us why you want to cancel this order..."
                                    className="min-h-[100px] border-red-200 bg-white focus-visible:ring-red-500 dark:border-red-800 dark:bg-red-950/50"
                                    {...field}
                                    value={field.value || ""}
                                    disabled={isSubmitting}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="mt-3 flex justify-end gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setCancellingOrderCode(null)
                            // setCancelReason("")
                        }}
                    >
                        Keep Order
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        type="submit"
                        disabled={!form.formState.isValid || isSubmitting}
                    >
                        {isSubmitting ? "Cancelling..." : "Confirm Cancellation"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}