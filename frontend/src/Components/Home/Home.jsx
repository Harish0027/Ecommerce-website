import React, { Fragment, useEffect } from "react";
import "./Home.css";
import Product from "../Product/ProductCard";
import MetaData from "../Header/MetaData";

import { useDispatch, useSelector } from "react-redux";
import { getProduct, clearErrors } from "../../Actions/ProductActions";
import Loading from "../../Loader/Loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Caresol from "./Carousal";
import Category from "./Category";
import { recentlyViewedProducts } from "../../../data/RecentlyViewed";
import RecentlyViewed from "./RecentlyViewed";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading,
    error,
    product: products = [],
  } = useSelector((state) => state.product);

  useEffect(() => {
    toast("hello i am harish");
    if (error) {
      console.error("error " + error);
      toast(error.message);
      dispatch(clearErrors());
    }

    dispatch(getProduct());
  }, [dispatch, error]);

  const navigateCart = () => {
    navigate("/me/cart");
  };

  return (
    <Fragment>
      <MetaData title="ECOMMERCE" />

      <div className="category-section">
        <Category />
      </div>

      <div className="banner-section">
        <Caresol />
      </div>

      <section className="featured-products-section">
        <h2 className="homeHeading">Featured Products</h2>

        <div className="container" id="container">
          {loading ? (
            <Loading />
          ) : (
            products &&
            products.map((product) => (
              <Product key={product._id} product={product} />
            ))
          )}
        </div>
      </section>

      <section className="bottom">
        <div className="bottom-banner">
          <div className="bottom-banner-img">
          <img src="/Images/banner/banner2.webp" alt="bottom-banner-img" />
        </div>
        <div className="recently-viewed">
          <h2>Recently viewed </h2>
          <div className="recentlyviewed-container">
            {recentlyViewedProducts.map((product, index) => (
              <RecentlyViewed product={product} key={index} />
           ))}
          </div>
        </div>
        </div>
      </section>

    </Fragment>
  );
};

export default Home;
