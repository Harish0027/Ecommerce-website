import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./Reducers/ProductReducers";

const store = configureStore({
  reducer: {
    product:productReducer
  },
  // No need for middleware unless you're adding custom ones
});

export default store;
