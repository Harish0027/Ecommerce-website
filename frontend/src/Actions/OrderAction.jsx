import axios from "axios";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../Constants/OrderConstants";

export const createOrder = (orderData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const res =await axios.post("http://localhost:4000/api/v1/order/placeOrder", orderData, {
      headers: {
        "Content-Type":"application/json",
      },
      withCredentials: true,
    });
    dispatch({ type: CREATE_ORDER_SUCCESS ,payload:res.data});
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error?.responce?.data?.message,
    });
  }
};



export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type:MY_ORDERS_REQUEST});
    const res =await axios.get("http://localhost:4000/api/v1/order/myOrders", {
      withCredentials: true,
    });
    dispatch({ type: MY_ORDERS_SUCCESS,payload:res.data.orders});
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error?.responce?.data?.message,
    });
  }
};


export const getOrderDetails = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const res = await axios.get(`http://localhost:4000/api/v1/order/getOrder/${orderId}`, {
      withCredentials: true,
    });

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: res.data.order,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error?.response?.data?.message || error.message,
    });
  }
};