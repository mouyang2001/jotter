import React, {useState, useEffect, Fragment} from 'react'

// material ui
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import {makeStyles} from '@material-ui/core/styles';
import { Button, DialogContent, TextField } from '@material-ui/core';

// redux
import { useSelector, useDispatch } from "react-redux";

import dataActions from "../redux/actions/dataActions";

const useStyles = makeStyles({
  submitButton: {
    float: 'right',
    marginTop: 10
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '5%',
  },
});

export default function PostNote() {

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('');

  const loading = useSelector(state => state.ui.loading);
  const errors = useSelector(state => state.ui.errors);

  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.entries(errors).length === 0 && !loading) {
      setNote('');
      handleClose();
    }
  }, [errors, loading]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(dataActions.postNote({body: note}));
  };

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleChange = (event) => {
    if (event.target.name === "body") setNote(event.target.value);
  }

  return (
    <Fragment>
      <Tooltip title="Post a Note" placement="bottom">
        <IconButton onClick={handleOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <Tooltip title="Close" placement="bottom">
            <IconButton className={classes.closeButton} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Tooltip>

        <DialogTitle>Post a new Note</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              id="body"
              name="body"
              type="text"
              label="Note"
              multiline
              rows="3"
              placeholder="Jot something down..."
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.textField}
              onChange={handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loading}
            >
              Submit
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
