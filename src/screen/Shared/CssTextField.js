import { TextField } from "@mui/material";
import { withStyles } from "@mui/styles";

const CssTextField = withStyles({
  root: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        height: "35px",
      },
      "& input": {
        padding: "5px 10px",
      },
      "&:hover fieldset": {},
      // '&.Mui-focused fieldset': {
      //   border: '1px solid rgb(30, 41, 58)',
      // },
      "& .MuiInputBase-input.Mui-disabled": {
        // backgroundColor: '#ECECEC',
        // color: 'black'
      },
      "&.MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
        // borderColor: '#fff',
      },
    },
  },
})(TextField);

export default CssTextField;
