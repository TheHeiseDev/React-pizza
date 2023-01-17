import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "Популярности",
    sortProperty: "rating",
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,

  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    handleTypeSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCategoryId, handleTypeSort, setCurrentPage } =
  filterSlice.actions;
export default filterSlice.reducer;