import type { ProductRatingSummaryType } from "@/types/product-rating.type";
import type { ColumnDef } from "@tanstack/react-table";

export const summaryColumns: ColumnDef<ProductRatingSummaryType>[] = [
  {
    accessorKey: "product",
    header: () => {
      return (
        <div className="text-primary flex items-center justify-start text-sm font-semibold">
          Product
        </div>
      );
    },
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex flex-col">
          <span className="text-muted-foreground text-sm font-semibold">{product.name}</span>
          <span className="text-muted-foreground text-xs font-normal">{product.brand.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "rating",
    header: () => {
      return (
        <div className="text-primary flex items-center justify-center text-sm font-semibold">
          Avg. Rating
        </div>
      );
    },
    cell: ({ row }) => {
      const rating = row.getValue("rating") as number;
      return (
        <div className="text-muted-foreground flex items-center justify-center text-sm font-normal">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-yellow-500">{rating.toFixed(1)}</span>
            <span className="text-yellow-500">★</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "ratingCount",
    header: () => {
      return (
        <div className="text-primary flex items-center justify-center text-sm font-semibold">
          Total Ratings
        </div>
      );
    },
    cell: ({ row }) => {
      const count = row.getValue("ratingCount") as number;
      return (
        <div className="text-muted-foreground text-center text-sm font-normal">
          {count}
        </div>
      );
    },
  },
];
