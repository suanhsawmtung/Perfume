"use client";

import { formatDate, formatName, formatPrice } from "@/lib/utils";
import { type InventoryItem } from "@/types/inventory.type.ts";
import { type ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<InventoryItem>[] = [
  {
    accessorKey: "productVariant.product.name",
    header: "Product",
    cell: ({ row }) => {
      const variant = row.original.productVariant;
      return (
        <div className="flex flex-col">
          <span className="font-medium">{variant.product.name}</span>
          <span className="text-xs text-muted-foreground">{variant.size}ml {variant.source === "DECANT" ? "(Decant)" : ""}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      return <span>{row.getValue("quantity")}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) => {
      return <span>{formatDate(row.getValue("createdAt"))}</span>;
    },
  },
  {
    accessorKey: "createdBy",
    header: "Created User",
    cell: ({ row }) => {
      const user = row.original.createdBy;
      if (!user) return "-";
      return <span>{formatName(user)}</span>;
    },
  },
  {
    accessorKey: "unitCost",
    header: "Unit Cost",
    cell: ({ row }) => {
      const amount = row.getValue("unitCost");
      return <span>{amount ? formatPrice(amount as string) : "-"}</span>;
    },
  },
  {
    accessorKey: "totalCost",
    header: "Total Cost",
    cell: ({ row }) => {
      const amount = row.getValue("totalCost");
      return <span>{amount ? formatPrice(amount as string) : "-"}</span>;
    },
  },
];
