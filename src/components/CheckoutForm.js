import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { axiosApi } from "../api/axiosApi";
import { Navigate } from "react-router";
import { toast } from "react-toastify";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

export const CheckoutForm = ({ handleSubmitSub }) => {
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const { error, paymentMethod } = await stripe.createPaymentMethod({
  //     type: "card",
  //     card: elements.getElement(CardElement),
  //   });

  //   if (!error) {
  //     console.log("Stripe 23 | token generated!", paymentMethod);
  //     try {
  //       const { id } = paymentMethod;
  //       let res = await axiosApi({ query: paymentMethod });
  //       console.log(res);
  //       // const response = await axios.post(
  //       //   "http://localhost:8080/stripe/charge",
  //       //   {
  //       //     amount: 999,
  //       //     id: id,
  //       //   }
  //       // );

  //       // console.log("Stripe 35 | data", response.data.success);
  //       // if (response.data.success) {
  //       //   console.log("CheckoutForm.js 25 | payment successful!");
  //       // }
  //     } catch (error) {
  //       console.log("CheckoutForm.js 28 | ", error);
  //     }
  //   } else {
  //     console.log(error.message);
  //   }
  // };

  return <CardElement options={CARD_ELEMENT_OPTIONS} />;
};
