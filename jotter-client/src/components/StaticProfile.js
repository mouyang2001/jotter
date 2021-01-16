import React, {Fragment} from 'react'
import { Link } from "react-router-dom";

import dayjs from 'dayjs';

// MUI
import { makeStyles } from "@material-ui/core/styles";
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";

// icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

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
  },
  progress: {
    display: "flex",
    margin: "20px auto 20px auto",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
  },
});

export default function StaticProfile(props) {

  const classes = useStyles();

  const credentials = props.profile;

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img
            src={credentials.imageUrl}
            alt="profile"
            className="profile-image"
          />
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
              <LocationOn color="primary" /> <span>{credentials.location}</span>
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
          <span>Joined {dayjs(credentials.createdAt).format("MMM YYYY")}</span>
        </div>
      </div>
    </Paper>
  );
}
