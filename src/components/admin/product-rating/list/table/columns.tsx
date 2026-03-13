import { formatDate } from "@/lib/utils";
import type { ProductRatingType } from "@/types/product-rating.type";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ProductRatingType>[] = [
  {
    accessorKey: "user",
    header: () => {
      return (
        <div className="text-primary flex items-center justify-start text-sm font-semibold">
          User
        </div>
      );
    },
    cell: ({ row }) => {
      const user = row.original.user;
      const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || user.username;
      return (
        <div className="flex flex-col">
          <span className="text-muted-foreground text-sm font-semibold">{fullName}</span>
          <span className="text-muted-foreground text-xs font-normal">@{user.username}</span>
        </div>
      );
    },
  },
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
      const product = row.original.product;
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
          Rating
        </div>
      );
    },
    cell: ({ row }) => {
      const rating = row.getValue("rating") as number;
      return (
        <div className="text-muted-foreground flex items-center justify-center text-sm font-normal">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-yellow-500">{rating}</span>
            <span className="text-yellow-500">★</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => {
      return (
        <div className="text-primary flex items-center justify-center text-sm font-semibold">
          Date
        </div>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      return (
        <div className="text-muted-foreground text-center text-sm font-normal">
          {formatDate(createdAt)}
        </div>
      );
    },
  },
];
