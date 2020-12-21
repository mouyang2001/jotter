// react
import React, { useEffect } from 'react'

// components
import Note from '../components/Note';
import ProfileCard from '../components/ProfileCard';

// material ui
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from "@material-ui/core/styles";

//redux 
import {useDispatch, useSelector} from 'react-redux';
import dataActions from '../redux/actions/dataActions';

// still have to implement nav buttons

const useStyles = makeStyles({
  progress: {
    display: "flex",
    margin: "20px auto 20px auto",
  },
});

export default function Home() {
  const classes = useStyles();

  // const [notes, setNotes] = useState(null);

  const dispatch = useDispatch();
  const notes = useSelector(state=> state.data.notes);
  const loading = useSelector(state=> state.data.loading);

  useEffect(() => {
    dispatch(dataActions.getNotes())
  }, []);

  let recentNotesMarkup = loading ? (
    <CircularProgress className={classes.progress} />
  ) : (
    notes.map((note) => <Note note={note} key={note.noteId} />)
  );

  return (
    <div>
      <Grid container>
        <Grid item sm={8} xs={12}>
          {recentNotesMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <ProfileCard/>
        </Grid>
      </Grid>
    </div>
  );
}
