import { DeleteProductDialog } from "@/components/admin/product/actions/delete-product-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getConcentrationVariant, getGenderVariant } from "@/lib/utils";
import type { ProductType } from "@/types/product.type";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowRightIcon, PencilLineIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";

// Actions cell component that can use hooks
const ActionsCell = ({ product }: { product: ProductListType }) => {
  return (
    <div className="flex items-center justify-end gap-1">
      <Button
        variant="outline"
        size="sm"
        className="h-7 rounded-sm border-none px-2 text-xs font-normal"
        asChild
      >
        <Link
          to={`/admin/products/${product.slug}/variants`}
          className="flex items-center justify-center gap-1 bg-blue-50 text-blue-400 hover:bg-blue-50 hover:text-blue-400"
        >
          Variants
        </Link>
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="h-7 rounded-sm border-none px-2 text-xs font-normal"
        asChild
      >
        <Link
          to={`/admin/products/${product.slug}`}
          className="flex items-center justify-center gap-1 bg-blue-50 text-blue-400 hover:bg-blue-50 hover:text-blue-400"
        >
          Details
          <ArrowRightIcon size={12} />
        </Link>
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="h-7 w-7 rounded-sm border-none bg-blue-50 text-blue-400 hover:bg-blue-50 hover:text-blue-400"
        asChild
      >
        <Link to={`/admin/products/${product.slug}/edit`}>
          <PencilLineIcon size={16} />
        </Link>
      </Button>

      <DeleteProductDialog product={product}>
        <Button
          variant="outline"
          size="sm"
          className="h-7 w-7 rounded-sm border-none bg-red-50 p-1 text-red-400 hover:bg-red-50 hover:text-red-400"
          asChild
        >
          <Trash2Icon size={16} />
        </Button>
      </DeleteProductDialog>
    </div>
  );
};

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "name",
    header: () => {
      return (
        <div className="text-primary flex items-center justify-start text-sm font-semibold">
          Name
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-muted-foreground text-sm font-semibold">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    id: "brand",
    header: () => {
      return (
        <div className="text-primary flex items-center justify-center text-sm font-semibold">
          Brand
        </div>
      );
    },
    cell: ({ row }) => {
      const brandName = row.original.brand.name;
      return (
        <div className="text-muted-foreground text-center text-sm font-normal">
          {brandName}
        </div>
      );
    },
  },
  {
    id: "variants",
    header: () => {
      return (
        <div className="text-primary flex items-center justify-center text-sm font-semibold">
          Variants
        </div>
      );
    },
    cell: ({ row }) => {
      const variantCount = row.original._count.variants;
      return (
        <div className="text-muted-foreground text-center text-sm font-normal">
          {variantCount}
        </div>
      );
    },
  },
  {
    accessorKey: "concentration",
    header: () => {
      return (
        <div className="text-primary flex items-center justify-center text-sm font-semibold">
          Concentration
        </div>
      );
    },
    cell: ({ row }) => {
      const concentration = row.getValue(
        "concentration",
      ) as ProductType["concentration"];
      const concentrationVariant = getConcentrationVariant(concentration);
      return (
        <div className="flex items-center justify-center">
          <Badge variant={concentrationVariant}>{concentration}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "gender",
    header: () => {
      return (
        <div className="text-primary flex items-center justify-center text-sm font-semibold">
          Gender
        </div>
      );
    },
    cell: ({ row }) => {
      const gender = row.getValue("gender") as ProductType["gender"];
      const genderVariant = getGenderVariant(gender);
      return (
        <div className="flex items-center justify-center">
          <Badge variant={genderVariant}>{gender}</Badge>
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
      const rating = Number(row.getValue("rating"));
      return (
        <div className="text-muted-foreground text-center text-sm font-normal">
          {Number.isFinite(rating) ? rating : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: () => {
      return (
        <div className="text-primary flex items-center justify-center text-sm font-semibold">
          Status
        </div>
      );
    },
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <div className="flex items-center justify-center">
          <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      return <ActionsCell product={row.original} />;
    },
  },
];
