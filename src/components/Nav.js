import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import { Logo } from "../constants";

const MENU = [
  { key: "project", label: "탐색", path: "/" },
  { key: "magazine", label: "매거진", path: "/magazine" },
];

const Nav = () => {
  const { pathname } = useLocation();
  const classes = useStyles();

  return (
    <AppBar position="sticky" color="inherit" elevation={0}>
      <Toolbar className={classes.toolbar}>
        <Link
          to="/"
          onClick={() => window.scrollTo(0, 0)}
          className={classes.iconLeft}
        >
          <Logo />
        </Link>
        {MENU.map((item, idx) => {
          const isCurrentLocation = pathname.includes(item.key);
          const isHome = pathname === "/";
          const isSelected =
            isCurrentLocation || (isHome && item.key === "project"); // 경로가 '/' 일때는 메뉴 중에 project를 하이라이트한다
          return (
            <Link
              key={idx}
              to={item.path}
              onClick={() => window.scrollTo(0, 0)}
            >
              <Typography
                variant="inherit"
                color={isSelected ? "textPrimary" : "textSecondary"}
                className={isSelected ? classes.selected : ""}
              >
                {item.label}
              </Typography>
            </Link>
          );
        })}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;

const useStyles = makeStyles({
  container: { padding: 0 },
  toolbar: {
    minHeight: "48px",
    display: "flex",
    gap: "36px",
    alignItems: "center",
    position: "relative",
  },
  iconLeft: {
    "& img": {
      height: "20px",
      verticalAlign: "middle",
    },
  },
  selected: {
    fontWeight: 700,
    borderBottom: "1px solid black",
  },
});
