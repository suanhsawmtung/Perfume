import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateRefund } from "@/services/refund/queries/useCreateRefund";
import type { RefundFormValues } from "@/types/refund.type";
import { refundSchema } from "@/validations/refund.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

interface CreateOrderRefundFormProps {
  orderCode: string;
  onClose: () => void;
}

export function CreateOrderRefundForm({ 
  orderCode,
  onClose 
}: CreateOrderRefundFormProps) {

  const createRefundMutation = useCreateRefund();

  const form = useForm<RefundFormValues>({
    resolver: zodResolver(refundSchema) as any,
    defaultValues: {
      orderCode: orderCode,
      amount: 0,
      reason: "",
    },
  });

  const onSubmit = (values: RefundFormValues) => {
    createRefundMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...field}
                    disabled={createRefundMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Reason for refund..."
                  className="min-h-[120px]"
                  {...field}
                  disabled={createRefundMutation.isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={createRefundMutation.isPending}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={createRefundMutation.isPending}
          >
            {createRefundMutation.isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            Create Refund
          </Button>
        </div>
      </form>
    </Form>
  );
}