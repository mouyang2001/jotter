// redux
import React, {useState} from 'react';
import {Link} from 'react-router-dom';

// material ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";  
import Button from "@material-ui/core/Button";  
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

// redux
import {useDispatch} from 'react-redux';
import userActions from "../redux/actions/userActions";

export default function Navbar() {

  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(userActions.logoutUser());
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  }

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
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem component={Link} to="/test">
          Testing
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>About</MenuItem>
        <MenuItem onClick={handleMenuClose}>Contact</MenuItem>
      </Menu>
    </div>
  );
}
