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
import type { PaymentFormValues, PaymentType } from "@/types/payment.type";
import { paymentSchema, updatePaymentSchema } from "@/validations/payment.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigation, useSubmit } from "react-router";

interface PaymentFormProps {
  payment?: PaymentType
}

export function PaymentForm({
  payment,
}: PaymentFormProps) {
  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isUpdate = !!payment;

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(isUpdate ? updatePaymentSchema : paymentSchema) as any,
    defaultValues: {
      orderCode: payment?.order?.code || "",
      method: payment?.method || "BANK_TRANSFER",
      amount: payment?.amount || 0,
      reference: payment?.reference || "",
      note: payment?.note || "",
      paidAt: payment?.paidAt ? new Date(payment.paidAt).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = (values: PaymentFormValues) => {
    const formData = new FormData();
    
    if (!isUpdate) {
      formData.append("orderCode", values.orderCode);
      formData.append("amount", String(values.amount));
    }
    
    if(values.reference) formData.append("reference", values.reference);
    if(values.note) formData.append("note", values.note);
    if(values.paidAt) formData.append("paidAt", values.paidAt);
    formData.append("method", values.method);

    submit(formData, {
      method: isUpdate ? "PATCH" : "POST",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="orderCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter order code"
                    {...field}
                    disabled={isSubmitting || isUpdate}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    disabled={isSubmitting || isUpdate}
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
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>Payment Method</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-2">
                    {PAYMENT_METHODS.map((method) => (
                      <TabButton
                        key={method.key}
                        text={method.text}
                        isSelected={field.value === method.key}
                        onClick={() => field.onChange(method.key)}
                        disabled={isSubmitting}
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
                    disabled={isSubmitting} 
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
                    disabled={isSubmitting} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
                  disabled={isSubmitting}
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
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
            {isUpdate ? "Update Payment" : "Record Payment"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
