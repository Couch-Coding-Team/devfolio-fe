import React, { useContext, useState } from "react";
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
import { RoutesContext } from "../AppContext";
import { Logo, VelogLogo, VELOG_URL } from "../constants";

const Nav = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const history = useHistory();
  const { pathname } = useLocation();
  const routes = useContext(RoutesContext);
  const routesOnMenu = routes.filter((route) => !!route.label);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  const handleMobileMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuItemClick = (route) => {
    history.push(route.path);
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
      {routesOnMenu.map((route, idx) => (
        <MenuItem key={idx} onClick={() => handleMobileMenuItemClick(route)}>
          {route.label}
        </MenuItem>
      ))}
    </Menu>
  );

  const DesktopMenu = () => {
    return routesOnMenu.map((route, idx) => {
      const isCurrentLocation = pathname === route.path;
      return (
        <Link
          key={idx}
          to={route.path}
          onClick={() => window.scrollTo(0, 0)}
          className={classes.desktopMenu}
        >
          <Typography
            variant="inherit"
            color={isCurrentLocation ? "textPrimary" : "textSecondary"}
            className={
              isCurrentLocation ? classes.selected : classes.deselected
            }
          >
            {route.label}
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
                to={routes.home}
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
