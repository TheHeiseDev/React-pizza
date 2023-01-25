import { RootState } from "./../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const initialState: FilterSliceState = {
  categoryId: 0,
  searchValue: "",
  currentPage: 1,
  sort: {
    name: "Популярности",
    sortProperty: SortPropertyEnum.RATING,
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,

  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    handleTypeSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.sort = action.payload.sort;
        state.currentPage = action.payload.currentPage;
        state.categoryId = action.payload.categoryId;
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sort = {
          name: "Популярности",
          sortProperty: SortPropertyEnum.RATING,
        };
      }
    },
  },
});

// Selectors
export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;

export const {
  setCategoryId,
  handleTypeSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;
export default filterSlice.reducer;
