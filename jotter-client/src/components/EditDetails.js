// react
import React, { Fragment, useState } from 'react'

// material ui
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

// redux
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../redux/actions/userActions';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// material ui
// 7:36:00 edit details popup box

const useStyles = makeStyles({

});

export default function EditDetails() {

  const classes = useStyles();
  const dispatch = useDispatch();
  
  const credentials = useSelector((state) => state.user.credentials);

  const [open, setOpen] = useState(false);
  const [bio, setBio] = useState(credentials.bio);
  const [location, setLocation] = useState(credentials.location);
  const [website, setWebsite] = useState(credentials.website);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }
  
  const handleSubmit = () => {
    const userDetails = {
      bio: bio,
      website: website,
      location: location
    }

    dispatch(userActions.editUserDetails(userDetails));
    
    handleClose();
  }

  const handleChange = (event) => {
    if (event.target.name === "bio") setBio(event.target.value);
    if (event.target.name === "website") setWebsite(event.target.value);
    if (event.target.name === "location") setLocation(event.target.location);
  }

  return (
    <div>
      <Fragment>
        <Tooltip title="Edit details" placement="top">
          <IconButton onClick={handleOpen}>
            <EditIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                multiline
                rows="3"
                placeholder="A short bio about yourself"
                className={classes.textField}
                value={bio}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="website"
                type="text"
                label="Website"
                placeholder="Your personal website"
                className={classes.textField}
                value={website}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="location"
                type="text"
                label="Location"
                placeholder="Where you live"
                className={classes.textField}
                value={location}
                onChange={handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    </div>
  );
}
