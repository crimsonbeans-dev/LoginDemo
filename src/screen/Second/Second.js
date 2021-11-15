import {
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import materialStyles from "../../Utils/styles";
import CAppBar from "../../components/CAppBar";
import CssTextField from "../Shared/CssTextField";
import { BsBagCheckFill } from "react-icons/bs";
import colors from "../../constants/colors.json";
import CDropzone from "../../components/CDropzone";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Footer from "../../components/Footer";
// import CPayment from "../../components/CPayment";
import PaymentSuccessDialog from "../../components/PaymentSuccessDialog";
import CPayment from "../../components/CPayment";
import {
  PaymentElement,
  PaymentRequestButtonElementComponent,
} from "@stripe/react-stripe-js";
// const stripePromise = loadStripe(
//   "pk_test_51JvGumSETABQuM8oUtfK1gG4lpcFFhh43EXTc3jpl7vaDhpxSxbIIi30SKRQjTfPpylWqlhtPQBJXaRWfR89hfcx00k0xqeyt4"
// );

// const options = {
//   // passing the client secret obtained from the server
//   clientSecret:
//     "sk_test_51JvGumSETABQuM8onsDOCOLPSSbb1zhoF7xmCGdkOZh1Ta9HrJuA1wW1asqzvyvxuX2xMTAgrjo9phgnXtVSjnKm002AZ58P9p",
// };

function Second(props) {
  const classes = materialStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    // handleSubmit();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CAppBar loggedIn />
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={12}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <CssTextField />
                <CDropzone />
                <CPayment />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
      <Dialog
        // fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth
        maxWidth={"sm"}
      >
        <DialogContent>
          <PaymentSuccessDialog />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Second;
