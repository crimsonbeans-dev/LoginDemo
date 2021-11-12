import React from "react";
import {
  AppBar,
  Container,
  createStyles,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    appBar: {
      backgroundColor: "#fff !important",
      color: "#000 !important",
      boxShadow: "rgb(7 1 82 / 6%) 0px 6px 24px !important",
      height: "70px !important",
      paddingLeft: "3%",
    },
  })
);

export default function CAppBar() {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AppLogo
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
