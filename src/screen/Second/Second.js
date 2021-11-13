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
  useMediaQuery,
} from "@mui/material";
import React, { useState, useMemo, useCallback } from "react";
import materialStyles from "../../Utils/styles";
import CAppBar from "../../components/CAppBar";
import CssTextField from "../Shared/CssTextField";
import { useDropzone } from "react-dropzone";
import { BsFillCloudArrowUpFill, BsFillCloudCheckFill } from "react-icons/bs";
import { useTheme } from "@mui/material/styles";
import { BsBagCheckFill } from "react-icons/bs";
import colors from "../../constants/colors.json";

const baseStyle = {
  marginTop: "20px",
  height: "50vh",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function Dropzone(props) {
  const [isUploaded, setIsUploaded] = useState(false);
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log("acceptedFiles", acceptedFiles);
    setIsUploaded(true);
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: "image/*", onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {isUploaded ? (
          <BsFillCloudCheckFill size={100} color={"#00e676"} />
        ) : (
          <BsFillCloudArrowUpFill
            size={100}
            color={isDragAccept ? "#00e676" : isDragReject ? "ff1744" : "grey"}
          />
        )}
        {!isUploaded && (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
    </div>
  );
}

function Second(props) {
  const classes = materialStyles();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const CList = ({ title, text, bold = false }) => {
    return (
      <div
        style={{
          display: "flex",
          paddingLeft: "30px",
          paddingRight: "30px",
          marginTop: "10px",
        }}
      >
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
          <Typography
            style={{
              fontSize: bold ? "18px" : "16px",
              fontWeight: bold ? "600" : "400",
              opacity: 0.8,
              lineHeight: "30px",
            }}
          >
            {title}
          </Typography>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <Typography
            style={{
              fontSize: bold ? "18px" : "16px",
              fontWeight: bold ? "600" : "400",
              opacity: 0.8,
              lineHeight: "30px",
            }}
          >
            {text}
          </Typography>
        </div>
      </div>
    );
  };
  return (
    <>
      <CAppBar loggedIn />
      <Container maxWidth="lg" onClick={handleClickOpen}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={8}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <CssTextField />
                <Dropzone />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Dialog
        // fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth
        maxWidth={"sm"}
      >
        <DialogContent>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "column",
              height: "90px",
              paddingBottom: "10px",
            }}
          >
            <BsBagCheckFill size={40} color={colors.success} />
            <Typography className={classes.paymentSuccessTitle}>
              Payment Successful
            </Typography>
          </div>
          <CList title={"Payment Type"} text={"Net banking"} />
          <CList title={"Mobile"} text={"0123456789"} />
          <CList title={"Email"} text={"xyz@email.com"} />
          <CList title={"Transaction id"} text={"12345678946584"} />
          <CList title={"Amount paid"} text={"500.00"} bold />
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
