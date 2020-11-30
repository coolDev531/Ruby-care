import "./App.css";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { useState } from "react";
import { yellow, red, blue } from "@material-ui/core/colors";
import { Paper } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import Layout from "./layouts/Layout/Layout";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import { CurrentUserProvider } from "./CurrentUser/CurrentUserContext";

function App() {


  const [darkMode, setDarkMode] = useState(false);

  const darkTheme = createMuiTheme({
    typography: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
    },

    palette: {
      type: "dark",
      text: {
        primary: yellow[700],
      },
      primary: {
        main: yellow[700],
      },
      secondary: {
        main: "#ff8f00",
      },
    },
  });

  const lightTheme = createMuiTheme({
    typography: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
    },
    palette: {
      primary: blue,
      secondary: red,
    },
  });

  return (
    <CurrentUserProvider>
    <Paper>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Layout darkMode={darkMode} setDarkMode={setDarkMode} title="care">
          <Switch>
            <Route path="/login" component={Login}>
            </Route>
            <Route path="/register" component={Register}>
            </Route>

            {/* <Route path="/" component={Home} /> */}
          </Switch>
        </Layout>
      </ThemeProvider>
    </Paper>
  </CurrentUserProvider>
  );
}

export default App;
