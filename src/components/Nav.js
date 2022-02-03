import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "gatsby";

const MENU = [
  { key: "project", label: "프로젝트", path: "/" },
  { key: "magazine", label: "매거진", path: "/magazine" },
];

const Nav = ({ location }) => {
  const { pathname } = location;
  return (
    <AppBar position="sticky" color="inherit" elevation={0}>
      <StyledToolbar>
        <Link
          to="/"
          // onClick={() => window.scrollTo(0, 0)}
        >
          <img alt="logo" src="/assets/logo.png" />
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
              // onClick={() => window.scrollTo(0, 0)}
            >
              <Typography
                variant="inherit"
                color={isSelected ? "textPrimary" : "textSecondary"}
                className={isSelected ? "selectedMenu" : ""}
              >
                {item.label}
              </Typography>
            </Link>
          );
        })}
      </StyledToolbar>
    </AppBar>
  );
};

const StyledToolbar = styled(Toolbar)({
  minHeight: "48px",
  display: "flex",
  gap: "36px",
  alignItems: "center",
  position: "relative",
  "& img": {
    height: "20px",
    verticalAlign: "middle",
  },
  "& .selectedMenu": {
    fontWeight: 700,
    borderBottom: "1px solid black",
  },
});
export default Nav;
