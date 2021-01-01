import React, {useState, Fragment} from "react";

import { makeStyles } from "@material-ui/core/styles";

// Material ui
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

// redux
import { useDispatch } from "react-redux";
import dataActions from "../redux/actions/dataActions";

const useStyles = makeStyles({
  deleteButton: {
    position: 'absolute',
    left: '90%'
  }
})

export default function DeleteNote(props) {

  const [open, setOpen] = useState(false);
  const noteId = props.noteId; 

  const dispatch = useDispatch();

  const classes = useStyles();

  const handleDelete = () => {
    dispatch(dataActions.deleteNote(noteId));
    setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Fragment>
      <Tooltip title="Delete" placement="bottom" className={classes.deleteButton}>
        <IconButton onClick={handleOpen}>
          <DeleteOutline color="secondary" />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete note?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
