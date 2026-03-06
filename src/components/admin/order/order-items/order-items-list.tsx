import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { OrderItem } from "@/types/order.type";
import { useMemo } from "react";
import { getOrderItemColumns } from "./table/columns";
import { DataTable } from "./table/data-table";

export function OrderItemsList({
  orderItems,
  orderCode,
  showActions = false,
}: {
  orderItems: OrderItem[];
  orderCode: string;
  showActions?: boolean;
}) {
  const columns = useMemo(() => getOrderItemColumns(showActions), [showActions]);

  return (
    <Card>
      <CardHeader className="flex flex-col items-start justify-start gap-2 px-4 md:flex-row md:justify-between md:px-6">
        <CardTitle className="w-full text-lg font-semibold md:text-2xl">
          Items in Order "{orderCode}"
        </CardTitle>
      </CardHeader>

      <CardContent className="min-h-[200px] px-4 md:px-6">
        <DataTable columns={columns} data={orderItems} />
      </CardContent>
    </Card>
  );
}
