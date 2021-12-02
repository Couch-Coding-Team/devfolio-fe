import React, { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Logo, VelogLogo, VELOG_URL, PATHS } from "../constants";

const MENU = [
  { key: "project", label: "탐색" },
  { key: "magazine", label: "매거진" },
];

const Nav = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const history = useHistory();
  const { pathname } = useLocation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  const handleMobileMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuItemClick = (item) => {
    history.push(PATHS[item.key].home);
    handleMobileMenuClose();
  };

  const MobileMenuDropdown = () => (
    <Menu
      keepMounted
      elevation={1}
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      open={Boolean(anchorEl)}
      onClose={handleMobileMenuClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      {MENU.map((item, idx) => (
        <MenuItem key={idx} onClick={() => handleMobileMenuItemClick(item)}>
          {item.label}
        </MenuItem>
      ))}
    </Menu>
  );

  const DesktopMenu = () => {
    return MENU.map((item, idx) => {
      const isCurrentLocation = pathname.split("/").includes(item.key);
      const isHome = pathname === "/";
      const isSelected =
        isCurrentLocation || (isHome && item.key === "project"); // 경로가 '/' 일때는 메뉴 중에 project를 하이라이트한다
      return (
        <Link
          key={idx}
          to={PATHS[item.key].home}
          onClick={() => window.scrollTo(0, 0)}
          className={classes.desktopMenu}
        >
          <Typography
            variant="inherit"
            color={isSelected ? "textPrimary" : "textSecondary"}
            className={isSelected ? classes.selected : classes.deselected}
          >
            {item.label}
          </Typography>
        </Link>
      );
    });
  };

  return (
    <AppBar position="sticky" color="inherit" elevation={0}>
      <Toolbar className={classes.toolbar}>
        <Container>
          {isMobile ? (
            <>
              <IconButton edge="start" onClick={handleMobileMenuClick}>
                <MenuIcon />
              </IconButton>
              <MobileMenuDropdown />
            </>
          ) : (
            <>
              <Link
                to={PATHS.project.home}
                onClick={() => window.scrollTo(0, 0)}
                className={classes.iconLeft}
              >
                <Logo />
              </Link>
              <DesktopMenu />
              <a
                href={VELOG_URL}
                target="_blank"
                rel="noreferrer"
                className={classes.iconRight}
              >
                <VelogLogo />
              </a>
            </>
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;

const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
  },
  iconLeft: {
    position: "absolute",
    left: 24,
    "& img": {
      height: "20px",
      width: "auto",
    },
  },
  iconRight: {
    position: "absolute",
    right: 24,
  },
  desktopMenu: {
    margin: "0 24px",
  },
  selected: {
    fontWeight: 700,
    borderBottom: "1px solid black",
  },
  deselected: {
    fontWeight: "initial",
    borderBottom: "initial",
  },
});
