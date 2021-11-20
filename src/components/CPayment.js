import React, { useContext, useEffect, useMemo } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { Button, CircularProgress, Typography } from "@mui/material";
import materialStyles from "../Utils/styles";
import useWindowDimensions from "../Utils/useWindowDimensions";
import CssTextField from "../screen/Shared/CssTextField";
import { toast } from "react-toastify";
import { AuthContext } from "../Utils/AuthProvider";

const CPayment = ({ handleSubmitSub, register, error, loading = false }) => {
  const { user } = useContext(AuthContext);

  const { width } = useWindowDimensions();

  const containerStyle = {
    width: width <= 500 ? width - 90 : 500,
  };

  const classes = materialStyles();

  const stripe = useStripe();
  const elements = useElements();
  const options = {
    style: {
      base: {
        fontSize: 24,
        color: "#424770",
        letterSpacing: "0.025em",
        width: "100%",
        flex: 1,
        // fontFamily: "Source Code Pro, monospace",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "crimson",
        border: "1px solid crimson",
      },
    },
  };
  const cardNumberOption = {
    placeholder: "Card Number",
  };

  useEffect(() => {
    console.log(error);
    if (error) toast.error("Please enter fullname");
  }, [error]);

  return (
    <form onSubmit={handleSubmitSub}>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          paddingTop: "20px",
          marginTop: "15px",
          backgroundColor: "#cfe2ff59",
          paddingBottom: "20px",
          borderRadius: 5,
        }}
      >
        <div style={containerStyle}>
          <Typography className={classes.titleThin}>Full Name</Typography>
          <input
            {...register("fullName", { required: true })}
            className="noBorder"
            style={{
              marginTop: "8px",
              marginBottom: "18px",
              backgroundColor: "#fff",
              border: "0px",
              height: 40,
              width: "100%",
              borderRadius: "5px",
              paddingLeft: "13px",
            }}
            // error={err}
            // onChange={(e) => {
            //   if (err) setErr(false);
            //   setUrl(e.target.value);
            // }}
          />
        </div>
        <div style={containerStyle}>
          <Typography className={classes.titleThin}>Card number</Typography>
          <CardNumberElement
            options={{ ...options, ...cardNumberOption }}
            onReady={() => {
              console.log("CardNumberElement [ready]");
            }}
            onChange={(event) => {
              console.log("CardNumberElement [change]", event);
            }}
            // onBlur={() => {
            //   console.log("CardNumberElement [blur]");
            // }}
            // onFocus={() => {
            //   console.log("CardNumberElement [focus]");
            // }}
          />
        </div>
        <div style={{ ...containerStyle, display: "flex" }}>
          <div style={{ flex: 1, marginRight: "20px" }}>
            <Typography className={classes.titleThin}>
              Expiration date
            </Typography>
            <CardExpiryElement
              options={options}
              onReady={() => {
                console.log("CardExpiryElement [ready]");
              }}
              onChange={(event) => {
                console.log("CardExpiryElement [change]", event);
              }}
              // onBlur={() => {
              //   console.log("CardExpiryElement [blur]");
              // }}
              // onFocus={() => {
              //   console.log("CardExpiryElement [focus]");
              // }}
            />
          </div>
          <div style={{ flex: 0.5 }}>
            <Typography className={classes.titleThin}>CVC</Typography>
            <CardCvcElement
              options={options}
              onReady={() => {
                console.log("CardCvcElement [ready]");
              }}
              onChange={(event) => {
                console.log("CardCvcElement [change]", event);
              }}
              // onBlur={() => {
              //   console.log("CardCvcElement [blur]");
              // }}
              // onFocus={() => {
              //   console.log("CardCvcrElement [focus]");
              // }}
            />
          </div>
        </div>
        <div style={containerStyle}>
          {user ? (
            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={!stripe}
            >
              {loading ? (
                <CircularProgress color="inherit" size={22} />
              ) : (
                "Pay Now"
              )}
            </Button>
          ) : (
            <Button disabled variant="contained" className={classes.buttonNext}>
              Pay Now
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default CPayment;
