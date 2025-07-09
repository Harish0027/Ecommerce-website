import React, { Fragment, useEffect } from "react";
import "./Home.css";
import Product from "../Product/ProductCard";
import MetaData from "../Header/MetaData";

import { useDispatch, useSelector } from "react-redux";
import { getProduct, clearErrors} from "../../Actions/ProductActions";
import Loading from "../../Loader/Loading";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const {
    loading,
    error,
    product: products = []
  } = useSelector((state) => state.product);

  useEffect(() => {
    toast("hello i am harish")
    if (error) {
      console.error("error "+error);
      toast(error.message)
      dispatch(clearErrors());
    }

    dispatch(getProduct());
  }, [dispatch, error]);

  const navigateCart=()=>{
    navigate("/me/cart")
  }

  return (
    <Fragment>
      <MetaData title="ECOMMERCE" />

      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a>
          <button onClick={navigateCart}>Scroll</button>
        </a>
      </div>

      <h2 className="homeHeading">Featured Products</h2>

      <div className="container" id="container">
        {loading ? (
          <Loading />
        ) : (
          products && products.map((product) => (
            <Product key={product._id} product={product} />
          ))
        )}
      </div>
    </Fragment>
  );
};

export default Home;
