import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import materialStyles from "../../Utils/styles";
import CAppBar from "../../components/CAppBar";
import CssTextField from "../Shared/CssTextField";
import CDropzone from "../../components/CDropzone";
import Footer from "../../components/Footer";
import PaymentSuccessDialog from "../../components/PaymentSuccessDialog";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db, firebaseApp } from "../../Utils/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { AuthContext } from "../../Utils/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function Second(props) {
  const { user, userData } = useContext(AuthContext);
  const classes = materialStyles();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState({});
  const [url, setUrl] = useState("");
  const [err, setErr] = useState(false);
  const [fileErr, setFileErr] = useState(false);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const storage = getStorage(firebaseApp);

  // Create the file metadata
  /***/
  const metadata = {
    contentType: "application/pdf",
  };

  const setData = async ({ collection, docId, data = {} }) => {
    console.log("called");
    const docRef = doc(db, collection, docId);
    let res = await setDoc(docRef, data, { merge: true });
    console.log("inthen", res);
    return res;
  };

  const submitData = async (downloadURL) => {
    const res = await setData({
      collection: "users",
      docId: user.uid,
      data: { fileUrl: downloadURL, url },
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    });
    setLoading(false);
    toast.success("Data Uploaded Successfully!");
    navigate("/success");
    // console.log("result", res);
  };

  const onSubmit = () => {
    if (url === "" && !file.name) {
      setErr(true);
      setFileErr(true);
      return;
    }
    if (url === "") {
      setErr(true);
      return;
    }
    if (!file.name) {
      setFileErr(true);
      return;
    }
    setLoading(true);
    const storageRef = ref(
      storage,
      "pdf/" + `${new Date().valueOf()}_${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        setLoading(false);

        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      async () => {
        // Upload completed successfully, now we can get the download URL
        let downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        submitData(downloadURL);
      }
    );
  };

  const fileUpload = (data) => {
    setFile(data[0]);

    // return;
    // Upload file and metadata to the object 'images/mountains.jpg'
  };

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
                <Typography className={classes.label}>URL</Typography>
                <CssTextField
                  error={err}
                  onChange={(e) => {
                    if (err) setErr(false);
                    setUrl(e.target.value);
                  }}
                />
                {err && (
                  <span
                    style={{
                      color: "crimson",
                      fontSize: "12px",
                      marginLeft: "10px",
                    }}
                  >
                    Url is required
                  </span>
                )}
                <CDropzone
                  fileUpload={fileUpload}
                  userData={userData}
                  setFileErr={setFileErr}
                />
                <div
                  style={{
                    marginLeft: "10px",
                    marginBottom: "20px",
                  }}
                >
                  {fileErr && (
                    <span
                      style={{
                        color: "crimson",
                        fontSize: "12px",
                        top: "-15px",
                      }}
                    >
                      File (.pdf) is required
                    </span>
                  )}
                </div>

                <Button variant="contained" fullWidth onClick={onSubmit}>
                  {loading ? (
                    <CircularProgress color="inherit" size={22} />
                  ) : (
                    "Submit"
                  )}
                </Button>
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
