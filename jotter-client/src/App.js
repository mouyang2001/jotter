import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

// components
import Navbar from './components/Navbar';

//pages
import home from './pages/Home';
import signup from './pages/Signup';
import login from './pages/Login';

import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#9c27b0",
      light: "#ab47bc",
      dark: "#7b1fa2",
      contrastText: "#fff",
    },
    secondary: {
      main: "#d500f9",
      light: "#e040fb",
      dark: "#6a1b9a",
      contrastText: "#fff",
    },
  },
});

// front end 4:44:44;

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
