// src/PaymentWrapper.jsx
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProceedPayment from "./Components/Order/ProceedPayment";

const PaymentWrapper = ({ stripeKey }) => {
  const stripePromise = loadStripe(stripeKey);

  return (
    <Elements stripe={stripePromise}>
      <ProceedPayment />
    </Elements>
  );
};

export default PaymentWrapper;
