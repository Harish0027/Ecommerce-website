import React from "react";
import { Link } from "react-router-dom";
import "./Success.css";

const Success = () => {
  return (
    <div className="successContainer">
      <div className="successCard">
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for shopping with us. Your order has been confirmed.</p>
        <Link to="/me/orders" className="viewOrdersBtn">
          View Orders
        </Link>
      </div>
    </div>
  );
};

export default Success;
