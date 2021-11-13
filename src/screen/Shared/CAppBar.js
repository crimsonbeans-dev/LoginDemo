import React from "react";
import {
  AppBar,
  Container,
  createStyles,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { MdAccountCircle } from "react-icons/md";
import { toast } from "react-toastify";
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "../../Utils/firebaseConfig";
import { useNavigate } from "react-router";

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

export default function CAppBar({ loggedIn = false }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  let navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    handleClose();
    const auth = getAuth(firebaseApp);
    signOut(auth)
      .then(() => {
        toast.success("SignOut Successfully!", { autoClose: 2000 });
        navigate("/");
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
        // An error happened.
      });
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AppLogo
        </Typography>
        {loggedIn && (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MdAccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={logOut}>Log Out</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
