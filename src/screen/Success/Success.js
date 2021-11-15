import { Card, CardContent, Container, Grid } from "@mui/material";
import React from "react";
import materialStyles from "../../Utils/styles";
import CAppBar from "../../components/CAppBar";
import Footer from "../../components/Footer";
import PaymentSuccessDialog from "../../components/PaymentSuccessDialog";

function Success(props) {
  const classes = materialStyles();

  return (
    <>
      <CAppBar loggedIn />
      <Container maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={12}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <PaymentSuccessDialog />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Success;
