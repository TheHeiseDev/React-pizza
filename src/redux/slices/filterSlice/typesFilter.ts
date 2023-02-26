export enum SortPropertyEnum {
  RATING = "rating",
  RATING_ = "-rating",
  PRICE = "price",
  PRICE_ = "-price",
  TITLE = "title",
  TITLE_ = "-title",
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface FilterSliceState {
  categoryId: number;
  searchValue: string;
  currentPage: number;
  sort: Sort;
}
