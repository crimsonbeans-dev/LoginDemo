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
import CDropzone from "../../components/CDropzone";
import Footer from "../../components/Footer";
import PaymentSuccessDialog from "../../components/PaymentSuccessDialog";

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
        <Grid container spacing={4} onClick={handleClickOpen}>
          <Grid item xs={12} sm={12} md={12}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography className={classes.label}>Email</Typography>
                <CssTextField />
                <CDropzone />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
      <Dialog
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
