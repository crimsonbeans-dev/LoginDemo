import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import React, { useMemo, useCallback } from "react";
import materialStyles from "../../Utils/styles";
import CAppBar from "../Shared/CAppBar";
import CssTextField from "../Shared/CssTextField";

import { useDropzone } from "react-dropzone";

const baseStyle = {
  marginTop: "20px",
  height: "150px",
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
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log("acceptedFiles", acceptedFiles);
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
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </div>
  );
}

function Second(props) {
  const classes = materialStyles();

  return (
    <>
      <CAppBar />
      <Container maxWidth="lg">
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
    </>
  );
}

export default Second;
