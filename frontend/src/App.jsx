import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import "./index.css";
import Loading from "./Loader/Loading";
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import Products from "./Components/ProductDetail/Products";
import Search from "./Components/ProductDetail/Search";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetail />} />
        <Route exact path={"/products"} element={<Products />} />
        <Route exact path={"/products/:keyword"} element={<Products />} />
        <Route exact path={"/search"} element={<Search/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
