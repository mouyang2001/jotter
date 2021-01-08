import React from "react";

import { Link } from "react-router-dom";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import HeartIcon from "@material-ui/icons/Favorite";
import HeartIconBorder from "@material-ui/icons/FavoriteBorder";

// redux
import { useDispatch, useSelector } from "react-redux";
import dataActions from "../redux/actions/dataActions";

export default function LikeButton(props) {

  const dispatch = useDispatch();

  const likes = useSelector((state) => state.user.likes);
  const authenticated = useSelector((state) => state.user.authenticated);
  
  const likedNote = () => {
    if (likes && likes.find((like) => like.noteId === props.noteId))
      return true;
    else return false;
  };

  const handleLike = () => {
    dispatch(dataActions.likeNote(props.noteId));
  };

  const handleUnlike = () => {
    dispatch(dataActions.unlikeNote(props.noteId));
  };

  const likeButton = !authenticated ? (
    <Link to="/login">
      <Tooltip title="Like" placement="bottom">
        <HeartIconBorder color="primary" />
      </Tooltip>
    </Link>
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

  return likeButton;
}
