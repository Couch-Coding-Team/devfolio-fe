import React from "react";
import { AppBar, makeStyles, Toolbar } from "@material-ui/core";

const Footer = () => {
  const classes = useStyles();
  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={0}
      className={classes.root}
    >
      <Toolbar>
        <p>
          <strong>DevFoliOh! 2021</strong>
        </p>
        <p>모든 컨텐츠의 저작권은 GitHub Respository 소유자에게 있습니다.</p>
        <p>devfolio.help@gmail.com</p>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;

const useStyles = makeStyles({
  root: {
    padding: "52px 0",
    textAlign: "center",
    "& .MuiToolbar-root": {
      flexDirection: "column",
      margin: "auto",
      "& p": {
        margin: "initial",
      },
    },
  },
});
