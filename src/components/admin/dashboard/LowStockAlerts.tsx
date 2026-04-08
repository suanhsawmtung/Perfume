import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type LowStockItem } from "@/types/dashboard.type";
import { Package } from "lucide-react";

interface LowStockAlertsProps {
  data: LowStockItem[];
}

export const LowStockAlerts = ({ data }: LowStockAlertsProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-red-600 dark:text-red-400 flex items-center">
            <Package className="mr-2 h-5 w-5" />
            Low Stock Alerts
          </CardTitle>
          <CardDescription>Items needing immediate restock</CardDescription>
        </div>
        <Badge variant="destructive">{data.length} Items</Badge>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-48">Product Name</TableHead>
              <TableHead className="min-w-28 text-center">Variant</TableHead>
              <TableHead className="text-right min-w-28 font-bold">Current Stock</TableHead>
              <TableHead className="text-right min-w-28">Threshold</TableHead>
              <TableHead className="text-center min-w-28">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium min-w-48">{item.name}</TableCell>
                <TableCell className="text-center min-w-28">{item.variant}</TableCell>
                <TableCell className="xl:text-right text-center font-bold min-w-28">
                  <span className={item.stock === 0 ? "text-red-600 font-extrabold" : "text-amber-600"}>
                    {item.stock}
                  </span>
                </TableCell>
                <TableCell className="xl:text-right text-center min-w-28">{item.threshold}</TableCell>
                <TableCell className="text-center min-w-28">
                  <Badge variant={item.stock === 0 ? "destructive" : "secondary"}>
                    {item.stock === 0 ? "Out of Stock" : "Critical"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  All products are well stocked.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
