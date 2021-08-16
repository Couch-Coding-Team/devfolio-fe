import React from "react";
import { Switch, Route } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import Nav from "./components/Nav";
import Home from "./containers/Home";
import Project from "./containers/Project";
import Footer from "./components/Footer";
import PageNotFound from "./components/PageNotFound";
import Auth from "./components/Auth";

const ROUTES = [
  { path: "/", component: Home, exact: true },
  { path: "/project/:id", component: Project, exact: true },
  { path: "*", component: PageNotFound },
];

function App() {
  return (
    <div className="App">
      <Auth>
        <ThemeProvider theme={theme}>
          <CssBaseline />
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
        </ThemeProvider>
      </Auth>
    </div>
  );
}

export default App;

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Roboto, sans-serif",
  },
  breakpoints: {
    values: {
      xs: 375,
      sm: 768,
      md: 1440,
      lg: 1920,
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
