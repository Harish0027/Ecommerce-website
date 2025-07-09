import React, { useEffect } from "react";
import "./Cart.css";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, grandTotal } = useSelector((state) => state.cart);
  const navigate=useNavigate();
  

  useEffect(() => {
    if (cartItems) console.log(cartItems);
    console.log(grandTotal);
  });

  const checkHandler=()=>{
       navigate("/shipping")
  }
  return (
    <Fragment>
      <div className="cartPage">
        <div className="cartHeader">
          <p>Product</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>
        {cartItems.map((cartItem, index) => (
          <CartItem key={index} cartItem={cartItem} />
        ))}
      </div>
      <div className="cartFooter">
        <div className="cartTotal">Grand Total: ₹{grandTotal}</div>
        <button className="checkOut" onClick={checkHandler}>Check Out</button>
      </div>
    </Fragment>
  );
};

export default Cart;
