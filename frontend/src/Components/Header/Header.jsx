import React from 'react';
import "./Header.css";

const Header = () => {
  return (
    <div className='navbar'>
      <img src='/logo.png' alt='logo' />

      <div className="navbar-actions">
        <button>
          <i className="fa-regular fa-user"></i>
          Sign up
        </button>

        <div className="cart-item">
          <i className="fa-solid fa-cart-shopping"></i>
          Cart
        </div>
      </div>
    </div>
  );
};

export default Header;
