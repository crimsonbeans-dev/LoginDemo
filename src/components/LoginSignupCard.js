import React, { useState } from "react";
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
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import InputField from "../screen/Shared/InputField";
import useWindowDimensions from "../Utils/useWindowDimensions";
import materialStyles from "../Utils/styles";

function LoginSignupCard({
  handleSubmit,
  control,
  errors,
  reset,
  onGoogleLogin,
  onFacebookLogin,
  onGitHubLogin,
  onMicrosoftLogin,
  onSignUp,
  onLogIn,
}) {
  // eslint-disable-next-line
  const emailRegx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // eslint-disable-next-line
  const passRegx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*["!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"])(?=.*[a-zA-Z]).{8,}$/;

  const classes = materialStyles();

  const [loadMore, setLoadMore] = useState(false);
  const [logIn, setLogIn] = useState(true);

  const { width } = useWindowDimensions();

  const handlePage = () => {
    reset({
      email: "",
      password: "",
    });
    setLogIn((prev) => !prev);
  };

  const loadMoreFun = () => {
    setLoadMore((prev) => !prev);
  };

  return (
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
          rules={
            logIn ? { required: true } : { required: true, pattern: passRegx }
          }
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
          onClick={handleSubmit(logIn ? onLogIn : onSignUp)}
        >
          {logIn ? "Sign In" : "Next"}
        </Button>
        <div style={{ paddingLeft: "20px" }}>
          <Typography className={classes.text}>
            By continuing, you agree to App's code of conduct,terms of use and
            privacy policy.
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
            <Button
              variant="text"
              className={classes.socialButton}
              onClick={onGoogleLogin}
            >
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
              <AiFillLinkedin fontSize={25} style={{ marginRight: "5px" }} />
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
            <Button
              variant="text"
              className={classes.socialButton}
              onClick={onFacebookLogin}
            >
              <BsFacebook fontSize={25} style={{ marginRight: "5px" }} />
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
                <Button
                  variant="text"
                  className={classes.socialButton}
                  onClick={onGitHubLogin}
                >
                  <AiFillGithub fontSize={25} style={{ marginRight: "5px" }} />
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
                <Button
                  variant="text"
                  className={classes.socialButton}
                  onClick={onMicrosoftLogin}
                >
                  <AiFillWindows fontSize={25} style={{ marginRight: "5px" }} />
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
                  <AiFillApple fontSize={25} style={{ marginRight: "5px" }} />
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
  );
}

export default LoginSignupCard;
