import React, { useEffect } from "react";
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ConfirmOrder = () => {
  const { shippingInfo } = useSelector((state) => state.shipping);
  const { cartItems, grandTotal } = useSelector((state) => state.cart);
  const { currentLoginUser } = useSelector((state) => state.currentLoggedUser);
  const navigate=useNavigate();

  const shippingCharges = grandTotal > 1000 ? 0 : 200;
  const tax = grandTotal * 0.18;
  const totalPrice = grandTotal + tax + shippingCharges;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  useEffect(()=>{
    console.log("s "+shippingInfo)
    console.log("c "+cartItems)
    console.log("cUser "+currentLoginUser.name);
    console.log(grandTotal)
  });

  const proceedToPayment=()=>{
    const data = {
    grandTotal,
    shippingCharges,
    tax,
    totalPrice,
  };

  sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/order/proceedPayment")
  }
  return (
    <div className="confirmOrderPage">
      {/* Left Side */}
      <div className="confirmOrderLeft">
        <div className="confirmshippingArea">
          <h2>Shipping Info</h2>
          <div className="confirmshippingAreaBox">
            <p>
              <b>Name:</b> harish
            </p>
            <p>
              <b>Phone:</b> {shippingInfo.phoneNo}
            </p>
            <p>
              <b>Address:</b> {address}
            </p>
          </div>
        </div>

        <div className="confirmCartItems">
          <h2>Your Cart Items:</h2>
          <div className="confirmCartItemsContainer">
            {cartItems.map((item) => (
              <div key={item.product} className="cartItemCard">
                <img src={item.image} alt="Product" />
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <span>
                  {item.quantity} X ₹{item.price} ={" "}
                  <b>₹{item.quantity * item.price}</b>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="confirmOrderRight">
        <h2>Order Summary</h2>
        <div className="orderSummaryDetails">
          <div>
            <p>grandTotal:</p>
            <span>₹{grandTotal}</span>
          </div>
          <div>
            <p>Shipping Charges:</p>
            <span>₹{shippingCharges}</span>
          </div>
          <div>
            <p>GST:</p>
            <span>₹{tax}</span>
          </div>
        </div>

        <div className="orderSummaryTotal">
          <p>
            <b>Total:</b>
          </p>
          <span>₹{totalPrice}</span>
        </div>

        <button className="paymentButton" onClick={proceedToPayment}>Proceed To Payment</button>
      </div>
    </div>
  );
};

export default ConfirmOrder;
