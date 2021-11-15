import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import CAppBar from "../../components/CAppBar";

import { useForm } from "react-hook-form";
import LoginSignupCard from "../../components/LoginSignupCard";
import materialStyles from "../../Utils/styles";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseApp } from "../../Utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PurchaseSummary from "../../components/PurchaseSummary";
import Footer from "../../components/Footer";
import { AuthContext } from "../../Utils/AuthProvider";
import BillingCard from "../../components/BillingCard";
import StripeCheckout from "react-stripe-checkout";

function Home() {
  const { user } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const microsoftProvider = new OAuthProvider("microsoft.com");

  let navigate = useNavigate();

  const classes = materialStyles();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSocialLogin = (provider) => {
    const auth = getAuth(firebaseApp);
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("SignUp Success", result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        // const user = result.user;
        // navigate("/second");
        toast.success("Logged in Successfully!");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        console.log("error", error);

        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.email;
        if (errorCode === "auth/popup-closed-by-user") return;

        toast.error(errorMessage);
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // const credential = FacebookAuthProvider.credentialFromResult(result);

        // ...
      });
  };
  const onGoogleLogin = () => {
    onSocialLogin(googleProvider);
  };

  const onFacebookLogin = () => {
    onSocialLogin(facebookProvider);
  };

  const onGitHubLogin = () => {
    onSocialLogin(githubProvider);
  };

  const onMicrosoftLogin = () => {
    onSocialLogin(microsoftProvider);
  };

  const onSignUp = (data) => {
    console.log("SignUp");
    // return
    const { email, password } = data;
    const auth = getAuth(firebaseApp);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        // ...
        console.log("result", userCredential);
        toast.success("SignUp Successfully!");
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log("error", error);
        toast.error(errorMessage);
      });
  };

  const onLogIn = (data) => {
    console.log("login");
    const { email, password } = data;
    const auth = getAuth(firebaseApp);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        // ...
        console.log("result", userCredential);
        toast.success("Logged in Successfully!");
        // navigate("/second");
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error", error);
        toast.error(errorMessage);
      });
  };

  const billingDetailsSubmit = (data) => {
    console.log("data", data);
  };

  return (
    <div>
      <CAppBar />
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={8}>
            {!user && (
              <LoginSignupCard
                handleSubmit={handleSubmit}
                control={control}
                errors={errors}
                reset={reset}
                onGoogleLogin={onGoogleLogin}
                onFacebookLogin={onFacebookLogin}
                onGitHubLogin={onGitHubLogin}
                onMicrosoftLogin={onMicrosoftLogin}
                onSignUp={onSignUp}
                onLogIn={onLogIn}
              />
            )}
            <BillingCard
              handleSubmit={handleSubmit}
              control={control}
              errors={errors}
              reset={reset}
              billingDetailsSubmit={billingDetailsSubmit}
            />
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography className={classes.cardTitle}>
                  Payment Details
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PurchaseSummary />
          </Grid>
        </Grid>
        <Footer />
      </Container>
    </div>
  );
}

export default Home;
