import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Payment.css";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../Actions/OrderAction";
import { toast } from "react-toastify";

const ProceedPayment = () => {
  const { shippingInfo } = useSelector((state) => state.shipping);
  const { currentLoginUser } = useSelector((state) => state.currentLoggedUser);
  const [orderInfo, setOrderInfo] = useState({});
  const payBtn = useRef(null);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const {isSucceed,error}=useSelector((state)=>state.order)

  const submitHandler = async (e) => {
  e.preventDefault();
  payBtn.current.disabled = true;

  try {
    const paymentData = {
      amount: Math.round(orderInfo.totalPrice * 100),
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const res = await axios.post(
      "http://localhost:4000/api/v1/payment/process",
      paymentData,
      config
    );

    const client_secret = res.data.client_secrete; // ✅ fixed typo

    if (!stripe || !elements || !client_secret) {
      alert("Stripe or elements or client secret not available");
      return;
    }

    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: currentLoginUser.name,
          email: currentLoginUser.email,
          address: {
            line1: shippingInfo.address,
            city: shippingInfo.city,
            state: shippingInfo.state,
            postal_code: shippingInfo.pinCode,
            country: shippingInfo.country,
          },
        },
      },
    });

    if (result.error) {
      payBtn.current.disabled = false;
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        const order = {
          shippingInfo,
          orderItems: JSON.parse(localStorage.getItem("cartItems")),
          paymentInfo: {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          },
          itemsPrice: orderInfo.subTotal,
          taxPrice: orderInfo.tax,
          shippingPrice: orderInfo.shippingCharges,
          totalPrice: orderInfo.totalPrice,
        };

        await dispatch(createOrder(order)); 
        if(isSucceed){
        navigate("/payment/success");
        }
      } else {
        alert("There's some issue while processing payment");
      }
    }
  } catch (error) {
    payBtn.current.disabled = false;
    console.log("Payment Error:", error.message);
  }
};


  useEffect(() => {
    if(error){
        toast.error(error);
    }
    setOrderInfo(JSON.parse(sessionStorage.getItem("orderInfo")));
  }, [error]);

  return (
    <div className="paymentContainer">
      <form className="paymentForm" onSubmit={submitHandler}>
        <h2>Card Info</h2>

        <div>
          <CardNumberElement className="paymentInput" />
        </div>

        <div>
          <CardExpiryElement className="paymentInput" />
        </div>

        <div>
          <CardCvcElement className="paymentInput" />
        </div>

        <input
          type="submit"
          value={`Pay - ${orderInfo && Math.floor(orderInfo.totalPrice)}`}
          ref={payBtn}
          className="paymentFormBtn"
        />
      </form>
    </div>
  );
};

export default ProceedPayment;
