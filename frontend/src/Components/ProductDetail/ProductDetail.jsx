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

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, error, product } = useSelector(
    (state) => state.productDetail
  );

  useEffect(() => {
    if (error) {
      toast(error.message);
      dispatch(clearErrors());
    }
    dispatch(getProductDetail(id));
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
                src={
                  "data:image/jpeg;base64,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"
                }
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
                <button>-</button>
                <input value="1" type="number" readOnly />
                <button>+</button>
              </div>
              <button>Add to Cart</button>
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
