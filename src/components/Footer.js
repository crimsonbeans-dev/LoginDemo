import { Typography } from "@mui/material";
import React from "react";
import materialStyles from "../Utils/styles";

function Footer(props) {
  const classes = materialStyles();
  return (
    <div
      style={{
        marginTop: "80px",
        paddingLeft: "5%",
        paddingRight: "5%",
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: "1px",
          backgroundColor: "#bcbcbc",
          width: "100%",
          marginBottom: "15px",
        }}
      />
      <Typography className={classes.text} style={{ alignSelf: "center" }}>
        The Site is protected by reCAPTCHA and the Google Privacy Policy and
        Terms of Service apply
      </Typography>
    </div>
  );
}

export default Footer;
