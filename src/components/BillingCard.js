import { Card, CardContent, Typography, Button } from "@mui/material";
import React, { useContext } from "react";
import InputField from "../screen/Shared/InputField";
import { AuthContext } from "../Utils/AuthProvider";
import materialStyles from "../Utils/styles";

function BillingCard({ handleSubmit, control, errors, billingDetailsSubmit }) {
  // eslint-disable-next-line
  const emailRegx =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  const { user } = useContext(AuthContext);

  const classes = materialStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography className={classes.cardTitle}>Billing Details</Typography>
        {user && (
          <form onSubmit={handleSubmit(billingDetailsSubmit)}>
            <Typography className={classes.label}>Name</Typography>
            <InputField
              errors={
                errors?.name && {
                  ...errors?.name,
                  message: "Name is required",
                }
              }
              control={control}
              inputType={"text"}
              name={"name"}
              rules={{ required: true }}
            />
            <Typography className={classes.label}>Email</Typography>
            <InputField
              errors={
                errors?.email && {
                  ...errors?.email,
                  message:
                    errors?.email?.type === "pattern"
                      ? "Enter a valid Email"
                      : "Email is required",
                }
              }
              control={control}
              inputType={"text"}
              name={"email"}
              rules={{ required: true, pattern: emailRegx }}
            />
            <Typography className={classes.label} style={{ marginTop: "10px" }}>
              Mobile
            </Typography>
            <InputField
              errors={
                errors?.mobile && {
                  ...errors?.mobile,
                  message: "Mobile is required",
                }
              }
              control={control}
              inputType={"number"}
              name={"mobile"}
              rules={{ required: true }}
            />
            <Typography className={classes.label}>Address</Typography>
            <InputField
              errors={
                errors?.address && {
                  ...errors?.address,
                  message: "Address is required",
                }
              }
              control={control}
              inputType={"text"}
              name={"address"}
              rules={{ required: true }}
            />
            <Button
              type="submit"
              variant="contained"
              className={classes.buttonNext}
            >
              Submit
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

export default BillingCard;
