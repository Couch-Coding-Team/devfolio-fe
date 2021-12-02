import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Container, Typography } from "@material-ui/core";
import { RoutesContext } from "../AppContext";

const Nav = () => {
  const { pathname } = useLocation();
  const routes = useContext(RoutesContext);
  const routesWithLabel = routes.filter((route) => !!route.label);
  return (
    <AppBar position="sticky" color="inherit" elevation={0}>
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <Container>
          <Link
            to="/"
            onClick={() => window.scrollTo(0, 0)}
            style={{ position: "absolute", left: 24 }}
          >
            <img
              alt="logo"
              src="/assets/logo.png"
              style={{ height: "20px", width: "auto" }}
            />
          </Link>
          {routesWithLabel.map((route, idx) => {
            const isCurrentLocation = pathname === route.path;
            return (
              <Link
                to={route.path}
                onClick={() => window.scrollTo(0, 0)}
                style={{ margin: "0 24px" }}
                key={idx}
              >
                <Typography
                  variant="inherit"
                  color={isCurrentLocation ? "textPrimary" : "textSecondary"}
                  style={{
                    fontWeight: isCurrentLocation ? 700 : 500,
                    borderBottom: isCurrentLocation
                      ? "1px solid black"
                      : "none",
                  }}
                >
                  {route.label}
                </Typography>
              </Link>
            );
          })}
          <a
            href="https://velog.io/@devfolio"
            target="_blank"
            rel="noreferrer"
            style={{ position: "absolute", right: 24 }}
          >
            <VelogLogo />
          </a>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;

const VelogLogo = () => (
  <svg width="24" height="24" viewBox="0 0 192 192" fill="none">
    <rect width="192" height="192" fill="currentColor" rx="24"></rect>
    <path
      d="M49 65.48V57.92C53.8 56.36 59.44 54.68 65.92 52.88C72.4 50.96 76.78 50 79.06 50C84.1 50 87.1 52.4 88.06 57.2L99.76 123.62C103.48 118.7 106.54 114.56 108.94 111.2C112.66 105.92 116.08 99.86 119.2 93.02C122.44 86.18 124.06 80.06 124.06 74.66C124.06 71.42 123.16 68.84 121.36 66.92C119.68 64.88 116.5 62.3 111.82 59.18C116.62 53.06 122.62 50 129.82 50C133.66 50 136.84 51.14 139.36 53.42C142 55.7 143.32 59.06 143.32 63.5C143.32 70.94 140.2 80.24 133.96 91.4C127.84 102.44 116.02 119.06 98.5 141.26L80.68 142.52L67 65.48H49Z"
      fill="white"
    ></path>
  </svg>
);
