import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../Store/LoginSlice";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  const dispatch = useDispatch();
  const { login } = useSelector((state) => state.auth);
  const nav = useNavigate();
  const logOut = () => {
    dispatch(auth(!login));
    nav("/Login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Button color="inherit" onClick={logOut}>
            Logout <LogoutIcon sx={{ marginLeft: "20px" }} />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
