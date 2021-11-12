import React, { useState, useEffect } from "react";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import CAppBar from "../Shared/CAppBar";

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
import { useParams, useNavigate } from "react-router-dom";

function Home(props) {
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
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
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
        const user = userCredential.user;
        // ...
        console.log("result", userCredential);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log("error", error);
      });
  };

  const onLogIn = (data) => {
    console.log("login");
    const { email, password } = data;
    const auth = getAuth(firebaseApp);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log("result", userCredential);
        navigate("/second");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error", error);
      });
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);
  return (
    <div>
      <CAppBar />
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={8}>
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
            {/* <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <div style={{ display: "flex" }}>
                  <Typography className={classes.cardTitle}>
                    Select Plan
                  </Typography>
                  <div
                    style={{
                      padding: "4px 8px",
                      borderRadius: "4px",
                      background: "rgb(225, 183, 255)",
                      marginLeft: "15px",
                    }}
                  >
                    <Typography className={classes.text}>
                      Personal Plus - Monthly
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card> */}
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography className={classes.cardTitle}>
                  Billing Details
                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography className={classes.cardTitle}>
                  Payment Details
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
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
                    <Typography className={classes.title}>
                      $47.00 USD
                    </Typography>
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
                    <Typography className={classes.titleThin}>
                      $47.00 USD
                    </Typography>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    paddingBottom: "15px",
                  }}
                >
                  <div style={{ flex: 1, minWidth: "225px" }}>
                    <Typography className={classes.titleThin}>
                      Sales Tax
                    </Typography>
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
          </Grid>
        </Grid>
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
      </Container>
    </div>
  );
}

export default Home;
