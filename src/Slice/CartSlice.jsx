import { createSlice } from "@reduxjs/toolkit";

const cartslice = createSlice({
  name: "cart",
  initialState: {
    items: [],     // Renamed from `carts` to `items` for consistency
    number: 0,
  },
  reducers: {
    addTocart: (state, action) => {
      state.items.push(action.payload);
      state.number += 1;
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.number -= 1;
    },
    clearCart: (state) => {
      state.items = [];
      state.number = 0;
    },
  },
});

export const { addTocart, removeFromCart, clearCart } = cartslice.actions;
export default cartslice.reducer;
