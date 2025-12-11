import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import { EmployeeAuthProvider } from "./context/EmployeeAuthContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/fr";


createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <StrictMode>
      <CssBaseline enableColorScheme />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
        <EmployeeAuthProvider>
          <App />
        </EmployeeAuthProvider>
      </LocalizationProvider>
    </StrictMode>
  </ThemeProvider>
);
