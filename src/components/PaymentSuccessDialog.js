import { Button, Typography } from "@mui/material";
import React from "react";
import { BsBagCheckFill } from "react-icons/bs";
import materialStyles from "../Utils/styles";
import colors from "../constants/colors.json";
import { useNavigate } from "react-router";
import { MdOutlineDone } from "react-icons/md";

function PaymentSuccessDialog(props) {
  const classes = materialStyles();
  let navigate = useNavigate();

  const CList = ({ title, text, bold = false }) => {
    return (
      <div
        style={{
          display: "flex",
          paddingLeft: "30px",
          paddingRight: "30px",
          marginTop: "10px",
        }}
      >
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
          <Typography
            style={{
              fontSize: bold ? "18px" : "16px",
              fontWeight: bold ? "600" : "400",
              opacity: 0.8,
              lineHeight: "30px",
            }}
          >
            {title}
          </Typography>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <Typography
            style={{
              fontSize: bold ? "18px" : "16px",
              fontWeight: bold ? "600" : "400",
              opacity: 0.8,
              lineHeight: "30px",
            }}
          >
            {text}
          </Typography>
        </div>
      </div>
    );
  };
  return (
    <div style={{ height: "20vh" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
          height: "120px",
          paddingBottom: "10px",
        }}
      >
        <div
          style={{
            height: 60,
            width: 60,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.success,
            borderRadius: 60,
            marginBottom: 20,
          }}
        >
          <MdOutlineDone size={40} color={"#fff"} />
        </div>
        <Typography className={classes.paymentSuccessTitle}>
          Successful
        </Typography>
      </div>
      {/* <CList title={"Payment Type"} text={"Card"} />
      <CList title={"Mobile"} text={"0123456789"} />
      <CList title={"Email"} text={"xyz@email.com"} />
      <CList title={"Transaction id"} text={"12345678946584"} />
      <CList title={"Amount paid"} text={"$47.00"} bold /> */}
      {/* <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
        }}
      >
        <Button variant="text" onClick={() => navigate("/")}>
          Go Back
        </Button>
      </div> */}
    </div>
  );
}

export default PaymentSuccessDialog;
