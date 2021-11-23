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
    </div>
  );
}

export default PaymentSuccessDialog;
