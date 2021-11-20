import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
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
  TwitterAuthProvider,
} from "firebase/auth";
import { firebaseApp } from "../../Utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PurchaseSummary from "../../components/PurchaseSummary";
import Footer from "../../components/Footer";
import { AuthContext } from "../../Utils/AuthProvider";
import BillingCard from "../../components/BillingCard";
import StripeCheckout from "react-stripe-checkout";
import Stripe from "../../components/Stripe";
import { CheckoutForm } from "../../components/CheckoutForm";
import {
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import CPayment from "../../components/CPayment";

function Home() {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const microsoftProvider = new OAuthProvider("microsoft.com");
  const twitterProvider = new TwitterAuthProvider();

  let navigate = useNavigate();

  const classes = materialStyles();
  const {
    register,
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

  const onTwitterLogin = () => {
    onSocialLogin(twitterProvider);
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

  const handleSubmitSub = async (data) => {
    console.log(data);
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    console.log("eeeee2");
    setLoading(true);
    // const email = "Test@gmail.com";
    // console.log(user.uid)
    // return
    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
      billing_details: {
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        address: { line1: data.address, country: "US" },
      },
    });
    console.log("Payment Method", result);
    if (result.error) {
      toast.error(result?.error?.message);
      setLoading(false);
      console.log(result.error.message);
      return;
    } else {
      const res = await axios.post(
        "https://voltagegreen.com.au/index/subscriptionPayment",
        {
          payment_method: result.paymentMethod.id,
          data: { ...data },
          email: data.email,
          uid: user.uid,
        }
      );
      setLoading(false);

      console.log("response", res);
      // eslint-disable-next-line camelcase
      const { client_secret, status } = res.data;

      if (status === "requires_action") {
        stripe.confirmCardPayment(client_secret).then(function (result) {
          if (result.error) {
            toast.error(result?.error?.message || "Something went wrong");

            console.log("There was an issue!");
            console.log(result.error);
            // Display error message in your UI.
            // The card was declined (i.e. insufficient funds, card has expired, etc)
          } else {
            toast.success("Payment Successful!");
            navigate("second");
            console.log("You got the money!");
            // Show a success message to your customer
          }
        });
      } else {
        toast.success("Payment Successful!");
        navigate("second");
        console.log("You got the money!");
        // No additional information was needed
        // Show a success message to your customer
      }
    }
  };

  const billingDetailsSubmit = (data) => {
    console.log("data", data);
    handleSubmitSub(data);
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
                onTwitterLogin={onTwitterLogin}
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
                <CPayment
                  handleSubmitSub={handleSubmit(handleSubmitSub)}
                  register={register}
                  error={!errors?.email && !errors?.address && errors?.fullName}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PurchaseSummary />
            {/* {user ? (
              <form onSubmit={handleSubmit(handleSubmitSub)}>
                <CheckoutForm />
                <Button variant="contained" type="submit" fullWidth>
                  {loading ? (
                    <CircularProgress color="inherit" size={22} />
                  ) : (
                    "Pay Now"
                  )}
                </Button>
              </form>
            ) : (
              <Button
                disabled
                variant="contained"
                className={classes.buttonNext}
              >
                Pay Now
              </Button>
            )} */}
          </Grid>
        </Grid>
        <Footer />
      </Container>
    </div>
  );
}

export default Home;
