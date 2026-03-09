import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { formatDate, formatName } from "@/lib/utils";
import { useToggleReviewPublish } from "@/services/review/queries/useTogglePublish";
import type { ReviewListType } from "@/types/review.type";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router";

const ActionsCell = ({ review }: { review: ReviewListType }) => {
  const { mutate: togglePublish, isPending } = useToggleReviewPublish();

  return (
    <div className="flex items-center justify-end gap-4">
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">
          {review.isPublish ? "Published" : "Unpublished"}
        </span>
        <Switch
          checked={review.isPublish}
          onCheckedChange={() => togglePublish(review.id)}
          disabled={isPending}
          size="sm"
        />
      </div>

      <Button
        variant="outline"
        size="sm"
        className="h-7 rounded-sm border-none px-2 text-xs font-normal"
        asChild
      >
        <Link
          to={`/admin/reviews/${review.id}`}
          className="flex items-center justify-center gap-1 bg-blue-50 text-blue-400 hover:bg-blue-50 hover:text-blue-400"
        >
          Details
          <ArrowRightIcon size={12} />
        </Link>
      </Button>
    </div>
  );
};

export const columns: ColumnDef<ReviewListType>[] = [
  {
    accessorKey: "content",
    header: () => (
      <div className="text-primary flex items-center justify-start text-sm font-semibold">
        Comment
      </div>
    ),
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate text-muted-foreground text-sm font-normal">
        {row.getValue("content")}
      </div>
    ),
  },
  {
    id: "user",
    header: () => (
      <div className="text-primary flex items-center justify-center text-sm font-semibold">
        User
      </div>
    ),
    cell: ({ row }) => {
      const name = formatName({
        firstName: row.original.user.firstName,
        lastName: row.original.user.lastName,
        username: row.original.user.username,
      });
      return (
        <div className="text-muted-foreground text-center text-sm font-normal">
          {name}
        </div>
      );
    },
  },
  {
    id: "product",
    header: () => (
      <div className="text-primary flex items-center justify-center text-sm font-semibold">
        Product
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-muted-foreground text-center text-sm font-normal">
        {row.original.product.name}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <div className="text-primary flex items-center justify-center text-sm font-semibold">
        Date
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-muted-foreground text-center text-sm font-normal">
        {formatDate(row.getValue("createdAt"))}
      </div>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => <ActionsCell review={row.original} />,
  },
];
