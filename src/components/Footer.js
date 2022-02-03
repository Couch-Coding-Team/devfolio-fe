import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";

const Footer = () => (
  <Root>
    <AppBar position="static" color="inherit" elevation={0} className="footer">
      <Toolbar>
        <p>
          <strong>DevFoliOh! 2021</strong>
        </p>
        <p>모든 컨텐츠의 저작권은 GitHub Respository 소유자에게 있습니다.</p>
        <p>devfolio.help@gmail.com</p>
      </Toolbar>
    </AppBar>
  </Root>
);

export default Footer;

const Root = styled("div")(({ theme }) => ({
  ".footer": {
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
}));
