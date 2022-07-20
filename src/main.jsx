import { ThemeProvider, createTheme } from "@mui/material";
import { amber, pink, red } from "@mui/material/colors";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import FeedbackContextProvider from "./contexts/FeedbackContext";
import "./index.css";

const theme = createTheme({
  palette: {
    primary: amber,
    secondary: pink,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <FeedbackContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </FeedbackContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
