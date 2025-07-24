import React from "react";
import "./Recently.css"

const RecentlyViewed = ({ product }) => {
  return (
    <div className="recently-product">
      <img src={product.image[0]} alt={`product-${product.id}`} />
      <div className="bottom-banner-product-info">
        <p>
          {product.name}
          <span>₹{product.price}</span>
        </p>
      </div>
    </div>
  );
};

export default RecentlyViewed;
