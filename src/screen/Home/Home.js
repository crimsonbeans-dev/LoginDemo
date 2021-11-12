import React, { useState, useEffect } from "react";
import {
  AppBar,
  Button,
  Card,
  CardContent,
  Container,
  createStyles,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CAppBar from "../Shared/CAppBar";
import CssTextField from "../Shared/CssTextField";
import {
  AiFillGoogleCircle,
  AiFillLinkedin,
  AiFillGithub,
  AiFillWindows,
  AiFillApple,
  AiFillTwitterCircle,
  AiFillAmazonCircle,
} from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { useForm } from "react-hook-form";
import InputField from "../Shared/InputField";
import useWindowDimensions from "../../Utils/useWindowDimensions";

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      marginTop: "25px",

      boxShadow: "rgb(7 1 82 / 6%) 0px 12px 24px !important",
    },
    cardContent: {
      padding: "24px !important",
    },
    cardTitle: {
      fontSize: "18px !important",
      lineHeight: "28px !important",
      fontWeight: "bold !important",
    },
    cardText: {
      fontSize: "14px !important",
      lineHeight: "28px !important",
      fontWeight: "500 !important",
    },
    label: {
      fontSize: "14px !important",
      lineHeight: "35px !important",
      fontWeight: "bold !important",
    },
    passwordInstruction: {
      fontSize: "12px !important",
      opacity: "0.7 !important",
      lineHeight: "22px !important",
    },
    buttonNext: {
      width: "100%",
      marginTop: "20px !important",
      marginBottom: "15px !important",
    },
    text: {
      fontSize: "13px !important",
      linHeight: "21px !important",
      color: "rgb(36, 50, 82) !important",
    },
    title: {
      fontSize: "16px !important",
      linHeight: "21px !important",
      color: "rgb(36, 50, 82) !important",
      fontWeight: "bold !important",
    },
    titleThin: {
      fontSize: "16px !important",
      linHeight: "21px !important",
      color: "rgb(36, 50, 82) !important",
      fontWeight: "normal !important",
    },
    socialButtonGrid: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    socialButton: {
      color: "rgb(36, 50, 82) !important",
      fontSize: "13px !important",
      textTransform: "none !important",
    },
  })
);

function Home(props) {
  const classes = useStyles();
  const [loadMore, setLoadMore] = useState(false);
  const [logIn, setLogIn] = useState(true);

  const { height, width } = useWindowDimensions();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  console.log(errors);
  const handlePage = () => {
    setLogIn((prev) => !prev);
  };
  const loadMoreFun = () => {
    setLoadMore((prev) => !prev);
  };
  const onSubmit = (data) => {
    console.log(data);
    reset();
    alert("Details Submited");
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
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <div
                  style={
                    width < 400
                      ? {}
                      : {
                          display: "flex",
                          height: "40px",
                          justifyContent: "space-between",
                        }
                  }
                >
                  <Typography className={classes.cardTitle}>
                    {logIn ? "Sign In" : "Create Account"}
                  </Typography>
                  <Typography className={classes.cardText}>
                    {logIn ? "New to App?" : "Already have an account?"}
                    <span
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={handlePage}
                    >
                      {logIn ? " Sign Up" : " Sign In"}
                    </span>
                  </Typography>
                </div>
                <Typography className={classes.label}>Email</Typography>

                <InputField
                  errors={
                    errors?.email && {
                      ...errors?.email,
                      message: "Email is required",
                    }
                  }
                  control={control}
                  inputType={"text"}
                  name={"email"}
                  rules={{ required: true }}
                />
                <Typography
                  className={classes.label}
                  style={{ marginTop: "10px" }}
                >
                  Password
                </Typography>
                <InputField
                  errors={
                    errors?.password && {
                      ...errors?.password,
                      message: logIn
                        ? "Password is required"
                        : "Password is required.\n Requires minimum of 8 characters, one uppercase character, one lowercase character and one number.",
                    }
                  }
                  control={control}
                  inputType={"password"}
                  name={"password"}
                  rules={{ required: true }}
                />

                {!logIn && (
                  <div
                    style={{
                      width: 400,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "5px",
                      }}
                    >
                      <Typography className={classes.passwordInstruction}>
                        • Minimum of 8 characters
                      </Typography>
                      <Typography
                        className={classes.passwordInstruction}
                        style={{ marginLeft: 20 }}
                      >
                        • One lowercase characters
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Typography className={classes.passwordInstruction}>
                        • One uppercase characters
                      </Typography>
                      <Typography
                        className={classes.passwordInstruction}
                        style={{ marginLeft: 10 }}
                      >
                        • One number
                      </Typography>
                    </div>
                  </div>
                )}
                <Button
                  variant="contained"
                  className={classes.buttonNext}
                  onClick={handleSubmit(onSubmit)}
                >
                  {logIn ? "Sign In" : "Next"}
                </Button>
                <div style={{ paddingLeft: "20px" }}>
                  <Typography className={classes.text}>
                    By continuing, you agree to App's code of conduct,terms of
                    use and privacy policy.
                  </Typography>
                </div>
                <Grid
                  container
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  rowSpacing={2}
                  style={{ marginTop: "5px" }}
                >
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    className={classes.socialButtonGrid}
                  >
                    <Button variant="text" className={classes.socialButton}>
                      <AiFillGoogleCircle
                        fontSize={25}
                        style={{ marginRight: "5px" }}
                      />
                      Sign Up with Google
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    className={classes.socialButtonGrid}
                  >
                    <Button variant="text" className={classes.socialButton}>
                      <AiFillLinkedin
                        fontSize={25}
                        style={{ marginRight: "5px" }}
                      />
                      Sign Up with Linkedin
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    className={classes.socialButtonGrid}
                  >
                    <Button variant="text" className={classes.socialButton}>
                      <BsFacebook
                        fontSize={25}
                        style={{ marginRight: "5px" }}
                      />
                      Sign Up with Facebook
                    </Button>
                  </Grid>
                  {loadMore && (
                    <>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        className={classes.socialButtonGrid}
                      >
                        <Button variant="text" className={classes.socialButton}>
                          <AiFillGithub
                            fontSize={25}
                            style={{ marginRight: "5px" }}
                          />
                          Sign Up with Github
                        </Button>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        className={classes.socialButtonGrid}
                      >
                        <Button variant="text" className={classes.socialButton}>
                          <AiFillWindows
                            fontSize={25}
                            style={{ marginRight: "5px" }}
                          />
                          Sign Up with Windows
                        </Button>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        className={classes.socialButtonGrid}
                      >
                        <Button variant="text" className={classes.socialButton}>
                          <AiFillApple
                            fontSize={25}
                            style={{ marginRight: "5px" }}
                          />
                          Sign Up with Apple
                        </Button>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.socialButtonGrid}
                      >
                        <Button variant="text" className={classes.socialButton}>
                          <AiFillTwitterCircle
                            fontSize={25}
                            style={{ marginRight: "5px" }}
                          />
                          Sign Up with Twitter
                        </Button>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.socialButtonGrid}
                      >
                        <Button variant="text" className={classes.socialButton}>
                          <AiFillAmazonCircle
                            fontSize={25}
                            style={{ marginRight: "5px" }}
                          />
                          Sign Up with Amazon
                        </Button>
                      </Grid>
                    </>
                  )}
                </Grid>
                {!loadMore && (
                  <div
                    style={{
                      display: "flex",
                      marginTop: "10px",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      className={classes.label}
                      style={{ color: "rgb(48, 104, 225)", cursor: "pointer" }}
                      onClick={loadMoreFun}
                    >
                      Load More
                    </Typography>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className={classes.card}>
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
            </Card>
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
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
                </div>
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
