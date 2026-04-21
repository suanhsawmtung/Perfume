export interface SelectOption {
  id: number;
  name: string;
  slug: string;
}

export interface FetchSelectPageParams {
  search: string;
  cursor: number | null;
}

export interface FetchSelectPageResult {
  items: SelectOption[];
  nextCursor: number | null;
}
