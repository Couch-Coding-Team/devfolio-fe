import React, { useContext } from "react";
import { useLocation } from "react-router";
import { Switch, Route } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Auth from "./components/Auth";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import Banner from "./components/Banner";

import { PATHS } from "./constants";
import { RoutesContext } from "./AppContext";

const App = () => {
  const { pathname } = useLocation();
  const routes = useContext(RoutesContext);
  return (
    <div className="App">
      <ErrorBoundary>
        <ScrollToTop />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Auth>
            {[PATHS.project.home, PATHS.magazine.home].includes(pathname) && (
              <Banner />
            )}
            <Nav />
            <Switch>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  component={route.component}
                  exact={route.exact}
                />
              ))}
            </Switch>
            <Footer />
          </Auth>
        </ThemeProvider>
      </ErrorBoundary>
    </div>
  );
};

export default App;

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  breakpoints: {
    values: {
      xs: 375,
      sm: 640,
      md: 1024,
      lg: 1280,
      // sm: 640,
      // md: 768,
      // lg: 1024,
      // xl: 1280
    },
  },
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#1302F4",
    },
    background: {
      default: "#FFFFFF",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          fontSize: "16px",
          wordBreak: "keep-all",
          "& a": {
            textDecoration: "none",
            color: "initial",
          },
        },
      },
    },
    MuiContainer: {
      root: {
        maxWidth: "1140px",
        padding: "24px",
      },
    },
    MuiButton: {
      root: {
        padding: "10px 20px",
        borderRadius: 0,
      },
    },
    MuiChip: {
      root: {
        padding: "0 12px",
      },
    },
  },
});
