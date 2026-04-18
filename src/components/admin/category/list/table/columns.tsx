import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import type { CategoryListType } from "@/types/category.type";
import type { ColumnDef } from "@tanstack/react-table";
import { PencilLineIcon, Trash2Icon } from "lucide-react";
import { Link, useLocation } from "react-router";

const ActionsCell = ({ category }: { category: CategoryListType }) => {
  const location = useLocation();

  return (
    <div className="flex items-center justify-end gap-1">
      <Button
        variant="outline"
        size="sm"
        className="h-7 w-7 rounded-sm border-none bg-blue-50 text-blue-400 hover:bg-blue-50 hover:text-blue-400"
        asChild
      >
        <Link 
          to={`/admin/categories/${category.slug}/edit`}
          state={{ from: location }}
        >
          <PencilLineIcon size={16} />
        </Link>
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="h-7 w-7 rounded-sm border-none bg-red-50 p-1 text-red-400 hover:bg-red-50 hover:text-red-400"
        asChild
      >
        <Link 
          to={`/admin/categories/${category.slug}/delete`}
          state={{ from: location }}
        >
          <Trash2Icon size={16} />
        </Link>
      </Button>
    </div>
  );
};

export const columns: ColumnDef<CategoryListType>[] = [
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
    id: "postCount",
    header: () => {
      return (
        <div className="text-primary flex items-center justify-center text-sm font-semibold">
          Post Count
        </div>
      );
    },
    cell: ({ row }) => {
      const postCount = row.original._count?.posts ?? 0;
      return (
        <div className="text-muted-foreground text-center text-sm font-normal">
          {postCount}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => {
      return (
        <div className="text-primary flex items-center justify-center text-sm font-semibold">
          Created At
        </div>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as Date | string;
      return (
        <div className="text-muted-foreground text-center text-sm font-normal">
          {formatDate(createdAt)}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      return <ActionsCell category={row.original} />
    },
  },
];
