import { createStyles } from "@mui/material";
import { makeStyles } from "@mui/styles";

const materialStyles = makeStyles(() =>
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

export default materialStyles;
