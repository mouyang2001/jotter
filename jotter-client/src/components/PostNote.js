import React, {useState, useEffect, Fragment} from 'react'

// material ui
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

// https://www.youtube.com/watch?v=m_u6P5k0vP0
// 9:20:00 zoom into note

// redux
import { useSelector, useDispatch } from "react-redux";
import { Button, DialogContent, TextField } from '@material-ui/core';
import dataActions from "../redux/actions/dataActions";

const useStyles = (theme) => ({
  ...theme,
  submitButton: {
    position: 'relative'
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '10%',
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
        <div classes={classes.closeButton}>
          <Tooltip title="Close" placement="bottom">
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </div>

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
