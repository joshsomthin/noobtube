import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import configureStore from "./store";
import { Provider } from "react-redux";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";

const store = configureStore({});

const theme = createMuiTheme({
  palette: {
    text: {
      primary: "#fff",
    },
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#9d07c3",
      contrastText: "#fff",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#b700ff",
      main: "#8c00c4",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#white",
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
