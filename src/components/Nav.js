import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar } from "@material-ui/core";

const Nav = () => {
  return (
    <AppBar position="sticky" color="inherit" elevation={0}>
      <Toolbar>
        <Link to="/">
          <img
            alt="logo"
            src="/assets/logo.png"
            style={{ height: "20px", width: "auto" }}
          />
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
