import React from 'react';
import {Link} from 'react-router-dom';

// import { AppBar } from '@material-ui/core';
// not recommended as it is quite slow
// recommended:
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";  
import Button from "@material-ui/core/Button";  
import Typography from '@material-ui/core/Typography';

export default function Navbar() {
  return (
    <div>
      <AppBar>
        <Toolbar className="nav-container">
          <div className="nav-title">
            <Typography variant="h6">Jotter</Typography>
          </div>
          <div className="nav-buttons">
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
            <Button color='inherit' component={Link} to="/test">
              Test
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
