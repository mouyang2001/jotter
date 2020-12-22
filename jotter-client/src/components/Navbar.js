// react
import React, {useState, Fragment} from 'react';
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
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';

// redux
import {useSelector} from 'react-redux';

export default function Navbar() {

  const [anchorEl, setAnchorEl] = useState(null);

  const authenticated = useSelector((state) => state.user.authenticated);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  }

  const handleAdd = () => {

  }

  return (
    <div>
      <AppBar>
        <Toolbar className="nav-container">
          <div className="nav-title">
            <Typography variant="h6">Jotter</Typography>
          </div>
          {authenticated ? (
            <div className="nav-buttons">
              <Fragment>
                <Tooltip title="Post a Note" placement="bottom">
                  <IconButton onClick={handleAdd}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
                <Link to="/">
                  <Tooltip title="Home" placement="bottom">
                    <IconButton>
                      <HomeIcon />
                    </IconButton>
                  </Tooltip>
                </Link>

                <Tooltip title="Notifications" placement="bottom">
                  <IconButton onClick={handleAdd}>
                    <Notifications />
                  </IconButton>
                </Tooltip>
              </Fragment>
            </div>
          ) : (
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
            </div>
          )}
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            <MoreVertIcon />
          </IconButton>
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
