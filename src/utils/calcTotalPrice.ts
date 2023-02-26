import { CartItem } from "../redux/slices/cartSlice/typesCart";

export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
