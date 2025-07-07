import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import "./index.css";
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import Products from "./Components/ProductDetail/Products";
import Search from "./Components/ProductDetail/Search";
import LoginSignUp from "./Components/Authcomponents/LoginRegister";
import Profile from "./Components/Authcomponents/Profile";
import MyProfile from "./Components/Authcomponents/MyProfile";
import ProtectedRoute from "./Route/ProtectedRoute";
import UpdateProfile from "./Components/Authcomponents/UpdateProfile";
import UpdatePassword from "./Components/Authcomponents/upDatePassword";
import ForgotPassword from "./Components/Authcomponents/ForgotPassword";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetail />} />
        <Route exact path={"/products"} element={<Products />} />
        <Route exact path={"/products/:keyword"} element={<Products />} />
        <Route exact path={"/search"} element={<Search />} />
        <Route exact path={"/login"} element={<LoginSignUp />} />
        <Route exact path={"/account"} element={<Profile />} />
        <Route exact path={"/password/forgot"} element={<ForgotPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route exact path={"/me/updatePass"} element={<UpdatePassword />} />
          <Route exact path={"/myaccount"} element={<MyProfile />} />
          <Route exact path={"/me/update"} element={<UpdateProfile />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
