import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useVerifyPayment } from "@/services/payment/queries/useVerifyPayment";
import type { PaymentType } from "@/types/order.type";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

interface PendingPaymentAlertProps {
  payments: PaymentType[];
}

export function PendingPaymentAlert({ payments }: PendingPaymentAlertProps) {
  const { mutate: verifyPayment, isPending } = useVerifyPayment();

  const pendingPayment = payments?.find((p) => p.status === "PENDING");

  if (!pendingPayment) return null;

  const handleAction = (status: "SUCCESS" | "FAILED") => {
    verifyPayment({
      id: pendingPayment.id,
      data: { status },
    });
  };

  return (
    <Alert variant="default" className="border-amber-200 bg-amber-50 dark:border-muted dark:bg-secondary">
      <AlertCircle className="h-5 w-5 text-amber-600" />
      <div className="flex w-full flex-col gap-4">
        <div className="w-full">
          <AlertTitle className="text-amber-800 dark:text-amber-300 font-bold">Action Required: Pending Payment</AlertTitle>
          <AlertDescription className="text-amber-700 dark:text-amber-200 inline-block">
            A payment of <span className="font-bold">{formatPrice(pendingPayment.amount)}</span> via <span className="font-semibold">{pendingPayment.method.replace("_", " ")}</span> is awaiting verification. 
            Please verify the transfer screenshot before proceeding.
          </AlertDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800"
            disabled={isPending}
            onClick={() => handleAction("SUCCESS")}
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Mark as Successful
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 hover:text-rose-800"
            disabled={isPending}
            onClick={() => handleAction("FAILED")}
          >
            <XCircle className="mr-2 h-4 w-4" />
            Mark as Failed
          </Button>
        </div>
      </div>
    </Alert>
  );
}
