import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import materialStyles from "../Utils/styles";

function PurchaseSummary() {
  const classes = materialStyles();
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography className={classes.cardTitle}>Purchase Summary</Typography>
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
            <Typography className={classes.titleThin}>Monthly Total</Typography>
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
        {/* <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div
                    style={{
                      width: "150px",
                      display: "flex",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      background: "rgb(53, 230, 160)",
                    }}
                  >
                    <Typography className={classes.text}>
                      Includes 7-Day Free Trial
                    </Typography>
                  </div>
                </div>
                <div
                  style={{
                    background: "rgb(232, 239, 255)",
                    color: "rgb(36, 50, 82)",
                    borderRadius: "4px",
                    padding: "16px",
                    borderLeft: "4px solid rgb(37, 86, 192)",
                    display: "flex",
                    marginTop: "15px",
                  }}
                >
                  <Typography className={classes.text}>
                    You will not be charged until after your trial ends on
                    <b> November 19th, 2021</b>
                  </Typography>
                </div> */}
      </CardContent>
    </Card>
  );
}

export default PurchaseSummary;
