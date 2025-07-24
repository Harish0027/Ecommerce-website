import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./Product.css";

const ProductCard = ({ product }) => {
  const {
    _id,
    name,
    price,
    rating = 0,
    numOfReviews = 0,
    images = [],
  } = product;

  const imageUrl =
    images[0]?.url || "https://via.placeholder.com/300x300.png?text=No+Image";

  return (
    <Link className="productCard" to={`/product/${_id}`}>
      <img src={imageUrl} alt={name} />
      <p className="productName">{name}</p>
      <div className="productRating">
        <ReactStars value={rating} edit={false} isHalf={true} size={20} />
        <span className="reviewCount">({numOfReviews})</span>
      </div>
      <span className="productPrice">₹{price}</span>
    </Link>
  );
};

export default ProductCard;
