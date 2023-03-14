import { RootState } from "../../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pizza, PizzaSliceState } from "./typesPizza";
import { fetchPizzas } from "./pizzaThunk";

const initialState: PizzaSliceState = {
  items: [],
  isLoading: true,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,

  reducers: {
    setPizzas(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.isLoading = true;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        alert("Ошибка запроса получения данных из сервера");
        state.items = [];
      });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setPizzas } = pizzaSlice.actions;
export default pizzaSlice.reducer;
