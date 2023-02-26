import { RootState } from "../../store";
import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Pizza, PizzaSliceState, SearchPizzaParams } from "./typesPizza";
import { API_URL } from "../../../API/serviceApi";

const initialState: PizzaSliceState = {
  items: [],
  isLoading: true,
};

// fetchPizzas<first, second> - The first type is the return type, the second type is the input
export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizza/fetchPizzas",
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `${API_URL}?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
    );

    return data;
  }
);

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
