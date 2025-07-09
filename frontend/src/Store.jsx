import { configureStore } from "@reduxjs/toolkit";
import {
  productDetailReducer,
  productReducer,
} from "./Reducers/ProductReducers";
import {
  loadUserReducer,
  UserLoginReducer,
  UserRegisterReducer,
  logOutUserReducer,
  updateUserReducer,
  forgotUserPasswordReducer,
} from "./Reducers/UserReducers";
import {
  cartReducer,
  shippingInfoReducer,
} from "./Reducers/CartReducer.JSX";

// STEP 1: Read from localStorage
const initialCartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialShippingInfo = localStorage.getItem("shippingInfo")
  ? JSON.parse(localStorage.getItem("shippingInfo"))
  : {};

// STEP 2: Configure Store
const store = configureStore({
  reducer: {
    product: productReducer,
    productDetail: productDetailReducer,
    userRegister: UserRegisterReducer,
    userLogin: UserLoginReducer,
    currentLoggedUser: loadUserReducer,
    userLogout: logOutUserReducer,
    updateUser: updateUserReducer,
    forgotPassword: forgotUserPasswordReducer,
    cart: cartReducer,
    shipping: shippingInfoReducer,
  },
  preloadedState: {
    cart: {
      cartItems: initialCartItems,
    },
    shipping: {
      shippingInfo: initialShippingInfo,
    },
  },
});

// STEP 3: Save to localStorage when cart or shippingInfo updates
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
  localStorage.setItem(
    "shippingInfo",
    JSON.stringify(state.shipping.shippingInfo)
  );
});

export default store;
