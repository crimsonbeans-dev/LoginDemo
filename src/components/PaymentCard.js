import { Card, CardContent, Typography, Button } from "@mui/material";
import React from "react";
import materialStyles from "../Utils/styles";
import {
  useStripe,
  useElements,
  CardElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";

function PurchaseSummary() {
  const classes = materialStyles();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    console.log("[PaymentMethod]", payload);
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography className={classes.title}>Pay Using Card</Typography>
        <CardElement />
      </CardContent>
    </Card>
  );
}

export default PurchaseSummary;
