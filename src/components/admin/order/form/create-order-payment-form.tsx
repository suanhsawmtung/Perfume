import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TabButton } from "@/components/ui/tab-button";
import { Textarea } from "@/components/ui/textarea";
import { PAYMENT_METHODS } from "@/constants/payment.constant";
import { useCreatePayment } from "@/services/payment/queries/useCreatePayment";
import type { PaymentFormValues } from "@/types/payment.type";
import { paymentSchema } from "@/validations/payment.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

interface CreateOrderPaymentFormProps {
  orderCode: string;
  onClose: () => void;
} 

export function CreateOrderPaymentForm({
  orderCode,
  onClose,
}: CreateOrderPaymentFormProps) {
  const createPaymentMutation = useCreatePayment();

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema) as any,
    defaultValues: {
      orderCode,
      method: "BANK_TRANSFER",
      amount: 0,
      reference: "",
      note: "",
      paidAt: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = (values: PaymentFormValues) => {
    createPaymentMutation.mutate(values, {
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
                  disabled={createPaymentMutation.isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="method"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Method</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {PAYMENT_METHODS.map((method) => (
                    <TabButton
                      key={method.key}
                      text={method.text}
                      isSelected={field.value === method.key}
                      onClick={() => field.onChange(method.key)}
                      disabled={createPaymentMutation.isPending}
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reference (Optional)</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="Transaction ID, etc." 
                  value={field.value || ""} 
                  disabled={createPaymentMutation.isPending} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paidAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paid At (Optional)</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type="date" 
                  value={field.value || ""} 
                  disabled={createPaymentMutation.isPending} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Internal Note (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Additional information..."
                  className="resize-none min-h-[100px]"
                  {...field}
                  value={field.value || ""}
                  disabled={createPaymentMutation.isPending}
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
            onClick={() => window.history.back()}
            disabled={createPaymentMutation.isPending}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={createPaymentMutation.isPending}
          >
            {createPaymentMutation.isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            Create Payment
          </Button>
        </div>
      </form>
    </Form>
  );
}