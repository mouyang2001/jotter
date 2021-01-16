// react
import React, {Fragment, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

// other
import dayjs from 'dayjs';

// mui
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import Comment from "@material-ui/icons/Comment";

// redux
import {useDispatch, useSelector } from 'react-redux';
import dataActions from "../redux/actions/dataActions";
import { IconButton } from '@material-ui/core';

// components
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';

const useStyles = makeStyles({
  dialogContent: {
    padding: 20,
  },
  invisibleSeparator: {
    border: "none",
    margin: 4,
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  closeButton: {
    position: "absolute",
    left: "90%",
    top: "5%",
  },
  circularProgress: {
    size: 50,
    display: "flex",
    margin: "20px auto 20px auto",
  },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    marginBottom: 20,
  },
});

export default function NoteDialog(props) {

  useEffect(() => {
    if (props.openDialog) {
      handleOpen();
    }
    // eslint-disable-next-line
  }, []); 

  const [open, setOpen] = useState(false);
  const [oldPathState, setOldPathState] = useState('');

  const classes = useStyles();

  const loading = useSelector((state) => state.ui.loading);
  const note = useSelector((state) => state.data.note);

  const dispatch = useDispatch();

  // todo fix undefined userhandle bug
  // something todo with state not updating

  const handleOpen = () => {
    setOpen(true);
    dispatch(dataActions.getNote(props.noteId));
    
    // pathing
    let oldPath = window.location.pathname;
    const newPath = `/users/${props.userHandle}/note/${props.noteId}`;

    // edge case
    if (oldPath === newPath) {
      oldPath = `/users/${props.userHandle}`;
    }

    window.history.pushState(null, null, newPath);
    setOldPathState(oldPath);
  };

  const handleClose = () => {
    window.history.pushState(null, null, oldPathState);
    setOpen(false);
    dispatch(dataActions.clearErrors());
  };

  const dialogMarkup = loading ? (
    <CircularProgress className={classes.circularProgress} />
  ) : (
    <Grid container spacing={16}>
      <Grid item sm={5}>
        <img
          src={note.userImage}
          alt="Profile"
          className={classes.profileImage}
        />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${note.userHandle}`}
        >
          @{note.userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(note.createdAt).format("h:mm a, MMMM DD YYYY")}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1">{note.body}</Typography>

      
        <LikeButton noteId={note.noteId} />
        <span>{note.likeCount} Likes</span>
        <Tooltip title="Comment" placement="bottom">
          <IconButton>
            <Comment color="primary" />
          </IconButton>
        </Tooltip>
        <span>{note.commentCount} Comments</span>

      </Grid>
      <hr className={classes.visibleSeparator}/>
      <CommentForm noteId={note.noteId} />
      <Comments />
    </Grid>
  );

  return (
    <Fragment>
      <Tooltip title="Expand" placement="bottom">
        <IconButton className={classes.expandButton} onClick={handleOpen}>
          <UnfoldMore color="primary" />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <Tooltip title="Close" placement="bottom">
          <IconButton className={classes.closeButton} onClick={handleClose}>
            <CloseIcon color="primary" />
          </IconButton>
        </Tooltip>

        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
