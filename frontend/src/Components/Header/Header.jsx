import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate=useNavigate();
  return (
    <div className="navbar">
      <div className="logo-container">
        <img src="/logo.png" alt="logo" />
        <span>QuickKart</span>
      </div>

      <div className="navbar-actions">
        <button onClick={()=>navigate("/login")}>
          <i className="fa-regular fa-user"></i>
          Sign up
        </button>

        <div className="cart-item" onClick={()=>navigate("/me/cart")}>
          <i className="fa-solid fa-cart-shopping"></i>
          Cart
        </div>
      </div>
    </div>
  );
};

export default Header;
