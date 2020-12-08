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

// redux
import {useDispatch, useSelector} from 'react-redux';

const theme = createMuiTheme(themeObject);

function App() {
  const authenticated = useSelector((state) => state.user.authenticated);
  const dispatch = useDispatch();
  
  const token = localStorage.FBIdToken;
  if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    if (decodedToken.exp * 1000 < Date.now()) {
      dispatch({ type: "SET_UNAUTHENTICATED" });
    } else {
      dispatch({ type: "SET_AUTHENTICATED" });
    }
  }

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
                />
                <Route exact path="/login">
                  {authenticated ? <Redirect to="/" /> : <Login />}
                </Route>
                <Route exact path="/signup">
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
