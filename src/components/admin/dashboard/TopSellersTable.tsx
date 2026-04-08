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
import { formatPrice } from "@/lib/utils";
import { type TopSeller } from "@/types/dashboard.type";

interface TopSellersTableProps {
  data: TopSeller[];
  className?: string; // For dynamic reusable positioning
}

export const TopSellersTable = ({ data, className }: TopSellersTableProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Top Selling Products</CardTitle>
        <CardDescription>Most popular perfumes based on filter</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-48 lg:min-w-auto">Product</TableHead>
              <TableHead className="min-w-40 lg:min-w-auto">Brand</TableHead>
              <TableHead className="min-w-28 text-center lg:min-w-auto">Variant</TableHead>
              <TableHead className="text-center min-w-28 font-bold lg:min-w-auto">Sales</TableHead>
              <TableHead className="text-right min-w-28 lg:min-w-auto">Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium min-w-48 lg:min-w-auto">{product.name}</TableCell>
                <TableCell className="min-w-40 lg:min-w-auto">{product.brand}</TableCell>
                <TableCell className="min-w-28 text-center lg:min-w-auto">{product.variant}</TableCell>
                <TableCell className="text-center min-w-28 font-bold lg:min-w-auto">{product.sales}</TableCell>
                <TableCell className="text-right min-w-28 lg:min-w-auto">{formatPrice(product.revenue)}</TableCell>
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No data found for this period.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
