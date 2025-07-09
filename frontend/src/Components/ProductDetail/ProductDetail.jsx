import React, { Fragment, useEffect } from "react";
import "./Detail.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProductDetail } from "../../Actions/ProductActions";
import ReactStars from "react-rating-stars-component";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Loading from "../../Loader/Loading";
import ReviewCard from "./ReviewCard";
import { toast } from "react-toastify";
import { useState } from "react";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, error, product } = useSelector(
    (state) => state.productDetail
  );

  const handleIncrement = () => {
    if (product.stock <= quantity) {
      console.log("stock is" + product.stock);
      toast("product out of stock!!!");
      return;
    }
    setQuantity((prev) => prev + 1);
  };
  const handleDecrement = () => {
    setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
  };

  const addToCart = (product) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.image[0].url,
        stock: product.stock,
        quantity,
      },
    });
  };

  useEffect(() => {
    if (error) {
      toast(error.message);
      dispatch(clearErrors());
    }


    dispatch(getProductDetail(id));
    console.log(product);
  }, [dispatch, error, id]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product?.rating || 0,
    isHalf: true,
  };

  if (loading || !product || Object.keys(product).length === 0) {
    return <Loading />;
  }

  return (
    <Fragment>
      <div className="ProductDetails">
        <Carousel>
          {product.images &&
            product.images.map((item, i) => (
              <img
                className="CarouselImage"
                key={item.url}
                src={product.image[0]}
                alt={`${i} Slide`}
              />
            ))}
        </Carousel>

        <div>
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>

          <div className="detailsBlock-2">
            <ReactStars {...options} />
            <span>({product.numOfReviews || 0} Reviews)</span>
          </div>

          <div className="detailsBlock-3">
            <h1>₹{product.price}</h1>

            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={handleDecrement}>-</button>
                <input value={quantity} type="number" readOnly />
                <button onClick={handleIncrement}>+</button>
              </div>
              <button onClick={()=>addToCart(product)}>Add to Cart</button>
            </div>

            <p>
              Status:{" "}
              <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                {product.Stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>

          <div className="detailsBlock-4">
            <p>Description:</p>
            <p>{product.description}</p>
          </div>

          <button className="submitReview">Submit Review</button>
        </div>
      </div>
      <h3 className="reviewsHeading">REVIEWS</h3>

      {product.reviews && product.reviews.length > 0 ? (
        <div className="reviews">
          {product.reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      ) : (
        <p className="noReviews">No Reviews Yet</p>
      )}
    </Fragment>
  );
};

export default ProductDetail;
