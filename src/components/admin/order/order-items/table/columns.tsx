import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { OrderItem } from "@/types/order.type";
import type { ColumnDef } from "@tanstack/react-table";
import { ExternalLink, PencilLineIcon, Trash2Icon } from "lucide-react";
import { Link, useLocation } from "react-router";

const ActionsCell = ({ item }: { item: OrderItem }) => {
  const product = item.productVariant?.product;
  const variant = item.productVariant;
  const location = useLocation();

  return (
    <div className="flex items-center justify-end gap-1">
      {product && variant && (
        <>
          <Button
            variant="outline"
            size="sm"
            className="h-7 w-7 rounded-sm border-none bg-blue-50 text-blue-400 hover:bg-blue-50 hover:text-blue-400"
            asChild
            title="View Product"
          >
            <Link 
              to={`/admin/products/${product.slug}/variants/${variant.slug}`}
              state={{ from: location }}
            >
              <ExternalLink size={16} />
            </Link>
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="h-7 w-7 rounded-sm border-none bg-blue-50 text-blue-400 hover:bg-blue-50 hover:text-blue-400"
            asChild
            title="Edit Variant"
          >
            <Link 
              to={`/admin/products/${product.slug}/variants/${variant.slug}/edit`}
              state={{ from: location }}
            >
              <PencilLineIcon size={16} />
            </Link>
          </Button>
        </>
      )}

      <Button
        variant="outline"
        size="sm"
        className="h-7 w-7 rounded-sm border-none bg-red-50 p-1 text-red-400 hover:bg-red-50 hover:text-red-400"
        title="Remove Item (Not Implemented)"
        onClick={() => alert("Remove item functionality coming soon!")}
      >
        <Trash2Icon size={16} />
      </Button>
    </div>
  );
};

export const getOrderItemColumns = (
  showActions: boolean = false
): ColumnDef<OrderItem>[] => {
  const columns: ColumnDef<OrderItem>[] = [
    {
      accessorKey: "product",
      header: () => (
        <div className="text-primary flex items-center justify-start text-sm font-semibold">
          Product & Brand
        </div>
      ),
      cell: ({ row }) => {
        const product = row.original.productVariant?.product;
        const brand = product?.brand;
        return (
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">
              {product?.name || "N/A"}
            </span>
            <span className="text-xs text-muted-foreground">
              {brand?.name || "N/A"}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "sku",
      header: () => (
        <div className="text-primary flex items-center justify-start text-sm font-semibold">
          SKU
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-muted-foreground text-sm font-normal">
          {row.original.productVariant?.sku || "-"}
        </div>
      ),
    },
    {
      accessorKey: "size",
      header: () => (
        <div className="text-primary flex items-center justify-center text-sm font-semibold">
          Size
        </div>
      ),
      cell: ({ row }) => {
        const size = row.original.productVariant?.size;
        return (
          <div className="text-muted-foreground text-center text-sm font-normal">
            {size ? `${size}ml` : "-"}
          </div>
        );
      },
    },
    {
      accessorKey: "itemType",
      header: () => (
        <div className="text-primary flex items-center justify-center text-sm font-semibold">
          Type
        </div>
      ),
      cell: ({ row }) => {
        const type = row.original.itemType;
        return (
          <div className="flex items-center justify-center">
            <Badge variant="outline" className="text-[10px] uppercase font-bold">
              {type.replace("_", " ")}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: () => (
        <div className="text-primary flex items-center justify-center text-sm font-semibold">
          Unit Price
        </div>
      ),
      cell: ({ row }) => {
        const price = Number(row.original.price);
        return (
          <div className="text-muted-foreground text-center text-sm font-normal">
            {formatPrice(price)}
          </div>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: () => (
        <div className="text-primary flex items-center justify-center text-sm font-semibold">
          Qty
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-muted-foreground text-center text-sm font-normal">
          {row.original.quantity}
        </div>
      ),
    },
    {
      id: "total",
      header: () => (
        <div className="text-primary flex items-center justify-center text-sm font-semibold">
          Total
        </div>
      ),
      cell: ({ row }) => {
        const total = Number(row.original.price) * row.original.quantity;
        return (
          <div className="text-foreground text-center text-sm font-semibold">
            {formatPrice(total)}
          </div>
        );
      },
    },
  ];

  if (showActions) {
    columns.push({
      id: "actions",
      header: "",
      cell: ({ row }) => <ActionsCell item={row.original} />,
    });
  }

  return columns;
};
