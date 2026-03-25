import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RefundType } from "@/types/order.type";
import { getColumns, type RefundTableMode } from "../../refund/list/table/columns";
import { DataTable } from "../../refund/list/table/data-table";
import { CreateOrderRefundDialog } from "../actions/create-order-refund-dialog";

interface OrderRefundsListProps {
  orderCode: string;
  refunds: RefundType[];
  mode?: RefundTableMode;
}

export function OrderRefundsList({ 
  orderCode, 
  refunds, 
  mode = "detail" 
}: OrderRefundsListProps) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between gap-2 px-4 md:px-6">
        <CardTitle className="w-full text-lg font-semibold md:w-1/4 md:text-2xl">
          Refunds
        </CardTitle>
        
        <CreateOrderRefundDialog orderCode={orderCode}>
          <Button
            type="button"
            variant="outline"
          >
            Add Refund
          </Button>
        </CreateOrderRefundDialog>
      </CardHeader>

      <CardContent className="min-h-[400px] px-4 md:px-6">
        <DataTable 
          columns={getColumns(mode)} 
          data={refunds as any} 
          emptyMessage="No refunds recorded for this order."
        />
      </CardContent>
    </Card>
  );
}
