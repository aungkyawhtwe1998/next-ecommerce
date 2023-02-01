import { RootState } from "./../../store";
import { Product } from "./../../type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Items {
  items: Item[];
  isOpen: boolean;
}
interface Item {
  id?: number;
  quantity: number;
  name: string;
  price: number;
  count: number;
}

const initialState: Items = {
  items: [],
  isOpen: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openCart: (state) => {
      state.isOpen = true;
    },

    closeCart: (state) => {
      state.isOpen = false;
    },

    addToCart: (state, action: PayloadAction<Product>) => {
      console.log("from redux", action.payload);
      const itemInCart = state.items.find(
        (item) => item.id === action.payload.id
      );
      console.log("exist: ", itemInCart);
      if (itemInCart) {
        itemInCart.count++;
      } else {
        console.log("not e");
        state.items.push({ ...action.payload, count: 1 });
      }
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.count++;
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        if (item.count === 1) {
          item.count = 1;
        } else {
          item.count--;
        }
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const removeItem = state.items.filter(
        (item) => item.id !== action.payload
      );
      state.items = removeItem;
    },
    removeAllItems: (state) => {
      state.items.splice(0, state.items.length)
    },
  },
});

export const {
  openCart,
  closeCart,
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  removeAllItems
} = cartSlice.actions;

export const selectItems = (state: RootState) => state.cart.items;
export const isOpen = (state: RootState) => state.cart.isOpen;
export const cartQuantity = (state: RootState) =>
  state.cart.items.reduce((count, item) => item.count + count, 0);
export default cartSlice.reducer;
