import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PaymentType } from "@/types/order.type";
import { getColumns, type PaymentTableMode } from "../../payment/list/table/columns";
import { DataTable } from "../../payment/list/table/data-table";
import { CreateOrderPaymentDialog } from "../actions/create-order-payment-dialog";

interface OrderPaymentsListProps {
  orderCode: string;
  payments: PaymentType[];
  mode?: PaymentTableMode;
}

export function OrderPaymentsList({ 
  orderCode, 
  payments, 
  mode = "detail" 
}: OrderPaymentsListProps) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between gap-2 px-4 md:px-6">
        <CardTitle className="w-full text-lg font-semibold md:w-1/4 md:text-2xl">
          Payments
        </CardTitle>
        
        <CreateOrderPaymentDialog orderCode={orderCode}>
          <Button
            type="button"
            variant="outline"
          >
            Add Payment
          </Button>
        </CreateOrderPaymentDialog>
      </CardHeader>

      <CardContent className="min-h-[400px] px-4 md:px-6">
        <DataTable 
          columns={getColumns(mode)} 
          data={payments as any} 
          emptyMessage="No payments recorded for this order."
        />
      </CardContent>
    </Card>
  );
}
