import React, { Fragment, useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, clearErrors } from "../../Actions/ProductActions";
import ProductCard from "../Product/ProductCard";
import Loading from "../../Loader/Loading";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./Products.css";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { keyword } = useParams();
  const [price, setPrice] = useState([0, 25000]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const dispatch = useDispatch();

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
    "Electronics",
    "Audio"
  ];

  const {
    product: products = [],
    error,
    loading,
    productsCount = 0,
    resultPerPage = 10,
  } = useSelector((state) => state.product);

  const priceHandler = (e, value) => {
    setPrice(value);
  };

  useEffect(() => {
    if (error) {
      toast(error.message || error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price,selectedCategory));
  }, [dispatch, keyword, currentPage, error, price,selectedCategory]);

  return loading ? (
    <Loading />
  ) : products.length === 0 ? (
    <h1>No Results Found</h1>
  ) : (
    <Fragment>
      <h2 className="productsHeading">Products</h2>

      <div className="productContainer">
        {/* Sidebar Filter */}
        <div className="filterBox">
          <label htmlFor="min-price">Min Price: ₹{price[0]}</label>
          <input
            type="range"
            id="min-price"
            min="0"
            max="25000"
            step="100"
            value={price[0]}
            onChange={(e) => {
              const newMin = Number(e.target.value);
              if (newMin <= price[1]) setPrice([newMin, price[1]]);
            }}
          />

          <label htmlFor="max-price">Max Price: ₹{price[1]}</label>
          <input
            type="range"
            id="max-price"
            min="0"
            max="25000"
            step="100"
            value={price[1]}
            onChange={(e) => {
              const newMax = Number(e.target.value);
              if (newMax >= price[0]) setPrice([price[0], newMax]);
            }}
          />
           <div className="categoryBox">
      <h3>Categories</h3>
      <ul>
        {categories.map((cat) => (
          <li
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
        </div>

        {/* Product Cards */}
        <div className="products">
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="paginationBox">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resultPerPage}
          totalItemsCount={productsCount}
          onChange={(pageNumber) => setCurrentPage(pageNumber)}
          nextPageText="Next"
          prevPageText="Prev"
          firstPageText="1st"
          lastPageText="Last"
          itemClass="page-item"
          linkClass="page-link"
          activeClass="pageItemActive"
          activeLinkClass="pageLinkActive"
        />
      </div>
    </Fragment>
  );
};

export default Products;
