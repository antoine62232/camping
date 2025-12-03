// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2E8B57",
    },
    secondary: {
      main: "#87CEEB",
    },
    section: {
      main: "#F5F5DC",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
    textondark: {
      default: "#FFFFFF",
    },
    separator: {
      default: "#D3D3D3",
    },
  },
  typography: {
    fontFamily: ["Montserrat", "Open Sans", "sans-serif"].join(","),
    h1: {
      fontFamily: "Montserrat, sans-serif",
      fontSize: "28px",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "Montserrat, sans-serif",
      fontSize: "22px",
      fontWeight: 600,
    },
    body1: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: "16px",
      fontWeight: 400,
    },
    body2: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: "12px",
      fontWeight: 400,
    },
    button: {
      fontFamily: "Montserrat, sans-serif",
      fontSize: "22px",
      fontWeight: 600,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    ...Array(24).fill("0px 0px 0px rgba(0,0,0,0)"),
  ],
});

theme.shadows.customSoft = '0px 2px 5px 2px rgba(0, 0, 0, 0.25)';

export default theme;
