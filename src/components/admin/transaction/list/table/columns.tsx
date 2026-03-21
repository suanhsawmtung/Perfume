import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  cn,
  formatDateTime,
  formatPrice,
  getTransactionTypeVariant
} from "@/lib/utils";
import { DeleteTransactionDialog } from "../../actions/delete-transaction-dialog";
import type { TransactionType } from "@/types/transaction.type";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowRightIcon, PencilLineIcon, TrashIcon } from "lucide-react";
import { Link } from "react-router";

const ActionsCell = ({ transaction }: { transaction: TransactionType }) => {
  return (
    <div className="flex items-center justify-end gap-1">
      <Button
        variant="outline"
        size="sm"
        className="h-7 rounded-sm border-none px-2 text-xs font-normal"
        asChild
      >
        <Link
          to={`/admin/transactions/${transaction.id}`}
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
        <Link to={`/admin/transactions/${transaction.id}/edit`}>
          <PencilLineIcon size={16} />
        </Link>
      </Button>

      <DeleteTransactionDialog transaction={transaction}>
        <Button
          variant="outline"
          size="sm"
          className="h-7 w-7 rounded-sm border-none bg-red-50 text-red-400 hover:bg-red-50 hover:text-red-400"
        >
          <TrashIcon size={16} />
        </Button>
      </DeleteTransactionDialog>
    </div>
  );
};

export const columns: ColumnDef<TransactionType>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.original.type;
      return <Badge variant={getTransactionTypeVariant(type)}>{type}</Badge>;
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const direction = row.original.direction;
      const plusOrMinus = direction === "IN" ? "+" : "-";
      return (
        <span className={cn("font-semibold", direction === "IN" ? "text-green-500" : "text-red-500")}>
          {plusOrMinus} {formatPrice(row.original.amount)}
        </span>
      );
    },
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
    cell: ({ row }) => row.original.createdBy?.username || "-",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => formatDateTime(row.original.createdAt),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      return <ActionsCell transaction={row.original} />;
    },
  },
];
