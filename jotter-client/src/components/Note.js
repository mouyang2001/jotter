import React from 'react'

import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  }
})

export default function Note(props) {

  //decontruct props.note
  const {userHandle, userImage, body, createdAt} = props.note;

  const classes = useStyles();

  dayjs.extend(relativeTime);

  return (
    <div>
      <Grid xs={12} sm={11}>
        <Card className={classes.card}>
          <CardMedia
            image={userImage}
            title="Profile Image"
            className={classes.image}
          />
          <CardContent className={classes.content}>
            <Typography
              variant="h5"
              component={Link}
              to={`/users/${userHandle}`}
              color="primary"
            >
              {userHandle}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).fromNow()}
            </Typography>
            <Typography variant="body1">{body}</Typography>
            <Button onClick={() => console.log(props)}>Props</Button>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
