import React from 'react'

import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from '@material-ui/core/Typography';
import Comment from '@material-ui/icons/Comment';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import HeartIcon from '@material-ui/icons/Favorite';
import HeartIconBorder from "@material-ui/icons/FavoriteBorder";

// redux
import {useDispatch, useSelector} from 'react-redux';
import dataActions from '../redux/actions/dataActions';

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
  const {userHandle, userImage, body, createdAt, likeCount, commentCount} = props.note;
  // redux
  const likes = useSelector(state => state.user.likes);
  const authenticated = useSelector(state => state.user.authenticated);

  const dispatch = useDispatch();

  const classes = useStyles();

  dayjs.extend(relativeTime);

  const handleComment = () => {
  }

  const likedNote = () => {
    if (likes && likes.find(like => like.noteId === props.note.noteId)) return true;
    else return false;
  }

  const handleLike = () => {
    dispatch(dataActions.likeNote(props.note.noteId));
  }

  const handleUnlike = () => {
    dispatch(dataActions.unlikeNote(props.note.noteId));
  }

  const likeButton = !authenticated ? (
    <Tooltip title="Like" placement="bottom">
      <Link to="/login">
        <HeartIconBorder color="primary" />
      </Link>
    </Tooltip>
  ) : likedNote() ? (
    <Tooltip title="Unlike" placement="bottom">
      <IconButton onClick={handleUnlike}>
        <HeartIcon color="primary" />
      </IconButton>
    </Tooltip>
  ) : (
    <Tooltip title="Like" placement="bottom">
      <IconButton onClick={handleLike}>
        <HeartIconBorder color="primary" />
      </IconButton>
    </Tooltip>
  );

  return (
    <div>
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
          {likeButton}
          <span>{likeCount} Likes</span>
          <Tooltip title="Comment" placement="bottom">
            <IconButton onClick={handleComment}>
              <Comment color="primary"/>
            </IconButton>
          </Tooltip>
          <span>{commentCount} Comments</span>
        </CardContent>
      </Card>
    </div>
  );
}
