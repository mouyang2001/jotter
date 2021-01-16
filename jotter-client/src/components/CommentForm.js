import React, {useState} from 'react'

import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {useDispatch, useSelector} from 'react-redux';

import dataActions from '../redux/actions/dataActions';

const useStyles = makeStyles({
  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    marginBottom: 20,
  },
  invisibleSeparator: {
    border: "none",
    margin: 4,
  },
  button: {
    marginTop: 10,
  }
});

export default function CommentForm(props) {

  const classes = useStyles();
  const authenticated = useSelector(state => state.user.authenticated);
  const errors = useSelector(state => state.ui.errors);

  const [body, setBody] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(dataActions.submitComment(props.noteId, {body: body}));
    setBody('');
  }

  const onChange = (event) => {
    if (event.target.name === 'body') setBody(event.target.value);
  }

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{textAlign: 'center'}}>
      <form onSubmit={handleSubmit}>  
        <TextField
          name="body"
          type='text'
          label='Comment on note'
          error={errors.comment ? true : false}
          helperText={errors.comment}
          onChange={onChange}
          value={body}
          fullWidth
          className={classes.textField}/>

          <Button type="submit"
          variant="contained"
          color="primary"
          className={classes.button}>
            Submit</Button>
      </form>

      <hr className={classes.visibleSeparator}/>
    </Grid>
  ) : null;

  return commentFormMarkup;
}
