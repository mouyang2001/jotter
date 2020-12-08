import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import './App.css';

// components
import Navbar from './components/Navbar';
import themeObject from './util/theme'

//pages
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Test from './pages/Test';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {MuiThemeProvider} from "@material-ui/core/styles";

const theme = createMuiTheme(themeObject);

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    authenticated = false;
  } else {
    authenticated = true;
  }
} 

function App() {
  return (
    <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={Home}
                  authenticated={authenticated}
                />
                <Route exact path="/login" component={Login}>
                  {authenticated ? <Redirect to="/" /> : <Login />}
                </Route>
                <Route exact path="/signup" component={Signup}>
                  {authenticated ? <Redirect to="/" /> : <Signup />}
                </Route>
                <Route exact path="/test" component={Test}/>
              </Switch>
            </div>
          </Router>
        </div>
    </MuiThemeProvider>
  );
}

export default App;
