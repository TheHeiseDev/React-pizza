import { calcTotalPrice } from "./../../utils/calcTotalPrice";
import { getCartFromLS } from "./../../utils/getCartFromLS";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CartItem, CartSliceState } from "../types/typesCart";

const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice,
  items,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItems = state.items.find((obj) => obj.id === action.payload.id);

      if (findItems) {
        findItems.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItems = state.items.find((obj) => obj.id === action.payload);

      if (findItems) {
        if (findItems.count <= 1) {
          return;
        } else {
          findItems.count--;

          state.totalPrice = calcTotalPrice(state.items);
        }
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((items) => items.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id)?.count;

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;
