import { Card, CardContent, Typography, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import materialStyles from "../Utils/styles";
import StripeCheckout from "react-stripe-checkout";
import { AuthContext } from "../Utils/AuthProvider";
import { axiosApi } from "../api/axiosApi";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function PurchaseSummary() {
  const { user } = useContext(AuthContext);

  const classes = materialStyles();
  let navigate = useNavigate();

  const [product] = useState({
    name: "Personal Plus - Monthly",
    price: 47 * 100,
  });

  const makePayment = async (token) => {
    const body = {
      token,
      product,
    };

    console.log("this is token????", token);
    let res = await axiosApi({ query: body });
    if (res?.data?.hasError === false) {
      toast.success("Payment Success");
      navigate("/success");
    } else {
      toast.danger(res?.data?.msg || "Something went worng");
    }
    console.log("result", res);
  };

  return (
    <>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.cardTitle}>
            Purchase Summary
          </Typography>
          <div
            style={{
              display: "flex",
              marginTop: "15px",
            }}
          >
            <div style={{ flex: 1, minWidth: "225px" }}>
              <Typography className={classes.text}>Plan</Typography>
            </div>
            <div style={{ flex: 1 }}>
              <Typography className={classes.text}>Price</Typography>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              paddingBottom: "15px",
              borderBottom: "1px solid #bcbcbc",
            }}
          >
            <div style={{ flex: 1, minWidth: "225px" }}>
              <Typography className={classes.title}>
                Personal Plus - Monthly
              </Typography>
            </div>
            <div style={{ flex: 1 }}>
              <Typography className={classes.title}>$47.00 USD</Typography>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "20px",
              paddingBottom: "15px",
            }}
          >
            <div style={{ flex: 1, minWidth: "225px" }}>
              <Typography className={classes.titleThin}>
                Order SubTotal
              </Typography>
            </div>
            <div style={{ flex: 1 }}>
              <Typography className={classes.titleThin}>$47.00 USD</Typography>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              paddingBottom: "15px",
            }}
          >
            <div style={{ flex: 1, minWidth: "225px" }}>
              <Typography className={classes.titleThin}>Sales Tax</Typography>
            </div>
            <div style={{ flex: 1 }}>
              <Typography className={classes.titleThin}></Typography>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              paddingBottom: "15px",
              borderBottom: "1px solid #bcbcbc",
            }}
          >
            <div style={{ flex: 1, minWidth: "225px" }}>
              <Typography className={classes.titleThin}>
                Monthly Total
              </Typography>
            </div>
            <div style={{ flex: 1 }}>
              <Typography className={classes.titleThin}></Typography>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "25px",
              paddingBottom: "10px",
            }}
          >
            <div style={{ flex: 1, minWidth: "225px" }}>
              <Typography className={classes.title}>Due Today</Typography>
            </div>
            <div style={{ flex: 1 }}>
              <Typography className={classes.title}>$0.00 USD</Typography>
            </div>
          </div>
        </CardContent>
      </Card>
      {user && (
        <StripeCheckout
          token={makePayment}
          stripeKey="pk_test_51JvGumSETABQuM8oUtfK1gG4lpcFFhh43EXTc3jpl7vaDhpxSxbIIi30SKRQjTfPpylWqlhtPQBJXaRWfR89hfcx00k0xqeyt4"
          // shippingAddress
          billingAddress
          name={"Pay Now"}
          amount={47 * 100}
          currency="USD"
          email="Test@gmail.com"
        >
          <Button variant="contained" className={classes.buttonNext}>
            Pay Now
          </Button>
        </StripeCheckout>
      )}
    </>
  );
}

export default PurchaseSummary;
