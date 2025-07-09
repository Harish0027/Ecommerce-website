import React from "react";
import "./CartItem.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD_TO_CART ,REMOVE_FROM_CART} from "../../Constants/CartConstants";

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();

  const increaseQty = () => {
    if (cartItem.quantity >= cartItem.stock) {
      alert("Maximum stock limit reached");
      return;
    }

    dispatch({
      type: ADD_TO_CART,
      payload: {
        ...cartItem,
        quantity: cartItem.quantity + 1,
      },
    });
  };

  const decreaseQty = () => {
    if (cartItem.quantity <= 1) return;

    dispatch({
      type: ADD_TO_CART,
      payload: {
        ...cartItem,
        quantity: cartItem.quantity - 1,
      },
    });
  };

  const removeItem = () => {
    console.log(cartItem)
    dispatch({
      type: REMOVE_FROM_CART,
      payload: cartItem.product,
    });
  };

  return (
    <div className="cartItemCard">
      <img src={cartItem.image} alt={cartItem.name} />
      <div>
        <Link to={`/product/${cartItem.product}`}>{cartItem.name}</Link>
        <p>Price: ₹{cartItem.price}</p>
        <button onClick={removeItem}>Remove</button>
      </div>

      <div className="cartQuantity">
        <button onClick={decreaseQty}>-</button>
        <input readOnly type="number" value={cartItem.quantity} />
        <button onClick={increaseQty}>+</button>
      </div>

      <p className="cartSubtotal">₹{cartItem.price * cartItem.quantity}</p>
    </div>
  );
};

export default CartItem;
