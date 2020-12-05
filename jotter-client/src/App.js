import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import './App.css';

// components
import Navbar from './components/Navbar';
import themeObject from './util/theme'

//pages
import home from './pages/Home';
import signup from './pages/Signup';
import login from './pages/Login';

import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {MuiThemeProvider} from "@material-ui/core/styles";

const theme = createMuiTheme(themeObject);

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  // 6:00:00
} 

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
