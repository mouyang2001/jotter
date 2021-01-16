import React from "react";

import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Comment from "@material-ui/icons/Comment";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

// redux
import { useSelector } from "react-redux";

// components
import DeleteNote from "./DeleteNote";
import NoteDialog from "./NoteDialog";
import LikeButton from "./LikeButton";

const useStyles = makeStyles({
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
  noteButtons: {
    marginTop: 10,
    display: "flex",
  },
});

export default function Note(props) {
  //decontruct props.note
  const {
    userHandle,
    userImage,
    body,
    createdAt,
    likeCount,
    commentCount,
  } = props.note;

  const authenticated = useSelector((state) => state.user.authenticated);
  const handle = useSelector((state) => state.user.credentials.handle);

  const classes = useStyles();

  dayjs.extend(relativeTime);

  const handleComment = () => {};

  //components
  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeleteNote noteId={props.note.noteId} />
    ) : null;

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
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <LikeButton noteId={props.note.noteId} />
          <span>{likeCount} Likes</span>
          <Tooltip title="Comment" placement="bottom">
            <IconButton onClick={handleComment}>
              <Comment color="primary" />
            </IconButton>
          </Tooltip>
          <span>{commentCount} Comments</span>
          <NoteDialog noteId={props.note.noteId} userHandle={userHandle} openDialog={props.openDialog}/>
        </CardContent>
      </Card>
    </div>
  );
}
