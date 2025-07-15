import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import Products from "./Components/ProductDetail/Products";
import Search from "./Components/ProductDetail/Search";
import LoginSignUp from "./Components/Authcomponents/LoginRegister";
import Profile from "./Components/Authcomponents/Profile";
import MyProfile from "./Components/Authcomponents/MyProfile";
import UpdateProfile from "./Components/Authcomponents/UpdateProfile";
import UpdatePassword from "./Components/Authcomponents/upDatePassword";
import ForgotPassword from "./Components/Authcomponents/ForgotPassword";
import Cart from "./Components/Cart/Cart";
import Shipping from "./Components/Order/Shipping";
import ConfirmOrder from "./Components/Order/ConfirmOrder";

import ProtectedRoute from "./Route/ProtectedRoute";
import "./index.css";
import PaymentWrapper from "./PaymentWrapper";
import Success from "./Components/Order/Success";
import MyOrders from "./Components/Order/MyOrders";
import OrderDetail from "./Components/Order/OrderDetail";

function App() {
  const [stripeKey, setStripeKey] = useState("");

  const getStripeKey = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/payment/getKey",
        {
          withCredentials: true,
        }
      );
      setStripeKey(data.stripeKey);
    } catch (err) {
      console.error("Failed to load Stripe key:", err);
    }
  };

  useEffect(() => {
    getStripeKey();
  }, []);

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/account" element={<Profile />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/order/confirm" element={<ConfirmOrder />} />
         <Route path="/payment/success" element={<Success/>} />
         <Route path="/me/orders" element={<MyOrders/>} />
         <Route path="/me/order/:id" element={<OrderDetail/>} />

        {/* ✅ Stripe payment route - only render if key is loaded */}
        {stripeKey && (
          <Route
            path="/order/proceedPayment"
            element={<PaymentWrapper stripeKey={stripeKey} />}
          />
        )}

        <Route element={<ProtectedRoute />}>
          <Route path="/me/updatePass" element={<UpdatePassword />} />
          <Route path="/myaccount" element={<MyProfile />} />
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/me/cart" element={<Cart />} />
        </Route>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
