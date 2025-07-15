import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  CLEAR_ERRORS,
} from "../Constants/OrderConstants";

// Create Order Reducer
export const OrderReducer = (
  state = { isSucceed: false, loading: false, error: null },
  action
) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        isSucceed: false,
      };

    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isSucceed: true,
        error: null,
      };

    case CREATE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};


const initialState = {
  orders: [],
  loading: false,
  error: null,
};

export const MyOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case MY_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MY_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case MY_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        orders: [],
      };
    default:
      return state;
  }
};



// Reducer for Order Details
const orderDetailsInitialState = {
  order: {},
  loading: false,
  error: null,
};

export const OrderDetailsReducer = (state = orderDetailsInitialState, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        order: {},
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
