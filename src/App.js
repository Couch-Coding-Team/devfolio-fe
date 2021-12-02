import React from "react";
import { useLocation } from "react-router";
import { Switch, Route } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import PageNotFound from "./components/PageNotFound";
import Auth from "./components/Auth";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import Banner from "./components/Banner";

import Home from "./containers/Home";
import Project from "./containers/Project";
import Magazine from "./containers/Magazine";
import ArticlePage from "./containers/Magazine/ArticlePage";

import { routes } from "./constants";
import { RoutesContext } from "./AppContext";

const ROUTES = [
  { path: routes.home, component: Home, exact: true, label: "탐색" },
  { path: routes.projectDetail, component: Project, exact: true },
  { path: routes.magazine, component: Magazine, exact: true, label: "매거진" },
  { path: routes.magazineDetail, component: ArticlePage, exact: true },
  { path: "*", component: PageNotFound },
];

const App = () => {
  const { pathname } = useLocation();
  return (
    <div className="App">
      <ErrorBoundary>
        <ScrollToTop />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RoutesContext.Provider value={ROUTES}>
            <Auth>
              {[routes.home, routes.magazine].includes(pathname) && <Banner />}
              <Nav />
              <Switch>
                {ROUTES.map((route) => (
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
          </RoutesContext.Provider>
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
      sm: 768,
      md: 1440,
      lg: 1920,
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
    MuiTypography: {
      h4: {
        fontSize: "1.5rem",
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
