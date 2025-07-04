import React, { Fragment, useState } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom"; // ✅ use useNavigate instead of history
import MetaData from "../Header/MetaData";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate(); // ✅ replaces history
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <Fragment>
      <MetaData title="Search a product" />
      <form className="searchBox" onSubmit={handleSubmit}> {/* ❌ was "from", fixed to "form" */}
        <input
          type="text"
          placeholder="Search a product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
