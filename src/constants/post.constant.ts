import { toTitleCase } from "@/lib/utils";
import type { PostStatus } from "@/types/post.type";

export const POST_STATUSES: { text: string; key: PostStatus }[] = [
  { text: "Draft", key: "DRAFT" },
  { text: "Published", key: "PUBLISHED" },
  { text: "Archived", key: "ARCHIVED" },
];

export const POST_FILTER_CONFIG = {
  category: {
    allowedValues: ["*"],
    displayComputed: (val: string) => `Category: ${toTitleCase(val.replace("-", " "))}`,
  },
  search: {
    allowedValues: ["*"],
    displayComputed: (val: string) => `Search: ${val}`,
  },
};
