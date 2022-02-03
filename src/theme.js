import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#1302F4",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#FFFFFF",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "10px 20px",
          borderRadius: 0,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        body {
          font-size: 16px;
        }
      `,
    },
  },
  // "& a": {
  //   textDecoration: "none",
  //   color: "initial",
  // },

  // MuiChip: {
  //   root: {
  //     padding: "0 12px",
  //   },
  // },
});

export default theme;
