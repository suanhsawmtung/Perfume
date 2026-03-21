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
import { TabButton } from "@/components/ui/tab-button";
import { Textarea } from "@/components/ui/textarea";
import type { TransactionType } from "@/types/transaction.type";
import {
    transactionSchema,
    transactionTypeEnum,
    updateTransactionSchema,
} from "@/validations/transaction.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigation, useSubmit } from "react-router";

interface TransactionFormProps {
  transaction?: TransactionType;
}

export function TransactionForm({ transaction }: TransactionFormProps) {
  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isUpdate = !!transaction;

  const form = useForm<any>({
    resolver: zodResolver(isUpdate ? updateTransactionSchema : transactionSchema),
    defaultValues: transaction
      ? {
          type: transaction.type,
          direction: transaction.direction,
          amount: transaction.amount,
          source: transaction.source,
          reference: transaction.reference || "",
          note: transaction.note || "",
        }
      : {
          type: "PAYMENT",
          direction: "IN",
          amount: undefined,
          source: "",
          reference: "",
          note: "",
        },
  });

  const type = form.watch("type");
  const direction = form.watch("direction");

  // Logic for create form: auto-change direction based on type
  useEffect(() => {
    if (!isUpdate) {
      if (["REFUND", "EXPENSE", "WITHDRAWAL"].includes(type)) {
        if (direction !== "OUT") {
          form.setValue("direction", "OUT");
        }
      } else if (type === "PAYMENT") {
        if (direction !== "IN") {
          form.setValue("direction", "IN");
        }
      }
    }
  }, [type, direction, form, isUpdate]);

  const onSubmit = (values: any) => {

    if (["REFUND", "EXPENSE", "WITHDRAWAL"].includes(values.type) && values.direction !== "OUT") {
        return; // Should be handled by useEffect but safe to check
    }
    if (values.type === "PAYMENT" && values.direction !== "IN") {
        return;
    }

    const formData = new FormData();
    if (isUpdate) {
      // Only source, reference, and note are allowed to be updated
      formData.append("source", values.source);
      formData.append("reference", values.reference || "");
      formData.append("note", values.note || "");
    } else {
      formData.append("type", values.type);
      formData.append("direction", values.direction);
      formData.append("amount", String(values.amount));
      formData.append("source", values.source);
      formData.append("reference", values.reference || "");
      formData.append("note", values.note || "");
    }

    submit(formData, {
      method: isUpdate ? "PATCH" : "POST",
    });
  };

  const showIn = !["REFUND", "EXPENSE", "WITHDRAWAL"].includes(type);
  const showOut = type !== "PAYMENT";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>Type</FormLabel>
                <div className="flex flex-wrap gap-2">
                  {transactionTypeEnum.map((t) => (
                    <TabButton
                      key={t}
                      isSelected={field.value === t}
                      onClick={() => field.onChange(t)}
                      disabled={isSubmitting || isUpdate}
                    >
                      {t}
                    </TabButton>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="direction"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>Direction</FormLabel>
                <div className="flex gap-2">
                  {showIn && (
                    <TabButton
                      isSelected={field.value === "IN"}
                      onClick={() => field.onChange("IN")}
                      disabled={isSubmitting || isUpdate}
                    >
                      IN
                    </TabButton>
                  )}
                  {showOut && (
                    <TabButton
                      isSelected={field.value === "OUT"}
                      onClick={() => field.onChange("OUT")}
                      disabled={isSubmitting || isUpdate}
                    >
                      OUT
                    </TabButton>
                  )}
                </div>
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
            name="source"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Source</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Source"
                    {...field}
                    disabled={isSubmitting}
                  />
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
                <FormLabel>Reference</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Reference"
                    {...field}
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
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Note for transaction..."
                  className="min-h-[120px]"
                  {...field}
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
            {isUpdate ? "Update Transaction" : "Create Transaction"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
