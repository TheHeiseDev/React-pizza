export interface PizzaSliceState {
  items: Pizza[];
  isLoading: boolean;
}

export type SearchPizzaParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
};

export type Pizza = {
  id: string;
  title: string;
  category: number;
  imageUrl: string;
  price: number;
  rating: number;
  sizes: number[];
  types: number[];
};
