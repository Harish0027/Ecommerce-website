import { ADD_TO_CART, REMOVE_FROM_CART ,SAVE_SHIPPING_INFO} from "../Constants/CartConstants";

export const cartReducer = (
  state = { cartItems: [], grandTotal: 0 },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      let updatedCartItems;

      if (isItemExist) {
        updatedCartItems = state.cartItems.map((cartItem) =>
          cartItem.product === isItemExist.product ? item : cartItem
        );
      } else {
        updatedCartItems = [...state.cartItems, item];
      }

      const updatedGrandTotal = updatedCartItems.reduce(
        (sum, current) => sum + current.quantity * current.price,
        0
      );

      return {
        ...state,
        cartItems: updatedCartItems,
        grandTotal: updatedGrandTotal,
      };

    case REMOVE_FROM_CART:
      const newCart = state.cartItems.filter((item, index) => {
        return item.product.toString() !== action.payload.toString();
      });

      const newTotal = newCart.reduce(
        (sum, current) => sum + current.quantity * current.price,
        0
      );
      return {
        ...state,
        cartItems: newCart,
        grandTotal: newTotal,
      };

    default:
      return state;
  }
};


export const shippingInfoReducer = (state = { shippingInfo: {}, isSave:false }, action) => {
  switch (action.type) {
    case SAVE_SHIPPING_INFO:
      const info = action.payload;

      return {
        ...state,
        shippingInfo: info,
        isSave:true,
      };

    default:
      return state;
  }
};

