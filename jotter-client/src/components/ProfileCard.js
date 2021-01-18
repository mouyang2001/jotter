// react
import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';

//components
import EditDetails from './EditDetails';

// material ui
import { makeStyles } from "@material-ui/core/styles";
import MuiLink from '@material-ui/core/Link';
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import KeyboardReturn from '@material-ui/icons/KeyboardReturnRounded';

// Locations
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

// redux
import {useSelector, useDispatch} from 'react-redux';
import userActions from "../redux/actions/userActions";

import ProfileSkeleton from '../util/ProfileSkeleton';

const useStyles = makeStyles({
  paper: {
    padding: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  profile: {
    // if wrapped within profile class, can be accessed using ""
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: "#00bcd4",
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
  progress: {
    display: 'flex',
    margin: "20px auto 20px auto",
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});

export default function ProfileCard() {

  const classes = useStyles();

  const loading = useSelector((state) => state.user.loading);
  const authenticated = useSelector((state) => state.user.authenticated);
  const credentials = useSelector((state) => state.user.credentials);

  const dispatch = useDispatch();

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    dispatch(userActions.uploadImage(formData));
  }

  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  const handleLogout = () => {
    dispatch(userActions.logoutUser());
  }

  let profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img
              src={credentials.imageUrl}
              alt="profile"
              className="profile-image"
            />
            <input
              type="file"
              id="imageInput"
              className={classes.input}
              onChange={handleImageChange}
              hidden="hidden"
            />
            <Tooltip title="Edit profile picture" placement="top">
              <IconButton
                onClick={handleEditPicture}
                className={classes.button}
              >
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/users/${credentials.handle}`}
              color="primary"
              variant="h5"
            >
              @{credentials.handle}
            </MuiLink>
            <hr />
            {credentials.bio && (
              <Typography variant="body2">{credentials.bio}</Typography>
            )}
            <hr />
            {credentials.location && (
              <Fragment>
                <LocationOn color="primary" />{" "}
                <span>{credentials.location}</span>
              </Fragment>
            )}
            <hr />
            {credentials.website && (
              <Fragment>
                <LinkIcon color="primary" />
                <a
                  href={credentials.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  {credentials.website}
                </a>
              </Fragment>
            )}
            <hr />
            <CalendarToday color="primary" />{" "}
            <span>
              Joined {dayjs(credentials.createdAt).format("MMM YYYY")}
            </span>
          </div>
        </div>
        <div className={classes.actions}>
          <Tooltip title="logout" placement="top">
            <IconButton onClick={handleLogout}>
              <KeyboardReturn color="primary" />
            </IconButton>
          </Tooltip>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found please login
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/signup"
            >
              Signup
            </Button>
          </div>
        </Typography>
      </Paper>
    )
  ) : (
    <ProfileSkeleton />
  );

  return profileMarkup;
}
