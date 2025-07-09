import { SAVE_SHIPPING_INFO } from "../Constants/CartConstants";

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({ type: SAVE_SHIPPING_INFO, payload: data });

  localStorage.setItem("ShippingInfo", JSON.stringify(data));
};
