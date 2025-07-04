import { configureStore } from "@reduxjs/toolkit";
import { productDetailReducer, productReducer } from "./Reducers/ProductReducers";
import { loadUserReducer, UserLoginReducer, UserRegisterReducer ,logOutUserReducer,updateUserReducer} from "./Reducers/UserReducers";

const store = configureStore({
  reducer: {
    product:productReducer,
    productDetail:productDetailReducer,
    userRegister:UserRegisterReducer,
    userLogin:UserLoginReducer,
    currentLoggedUser:loadUserReducer,
    userLogout:logOutUserReducer,
    updateUser:updateUserReducer
    },
  // No need for middleware unless you're adding custom ones
});

export default store;
