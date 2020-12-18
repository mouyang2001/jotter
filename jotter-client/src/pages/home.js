// react
import React, { useState, useEffect } from 'react'

// components
import Note from '../components/Note';
import ProfileCard from '../components/ProfileCard';

// material ui
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from "@material-ui/core/styles";
// axios
import axios from '../util/axios';

const useStyles = makeStyles({
  progress: {
    display: "flex",
    margin: "20px auto 20px auto",
  },
});

export default function Home() {
  const classes = useStyles();

  const [notes, setNotes] = useState(null);

  useEffect(() => {
    axios.get("/notes")
      .then(res => {
        setNotes(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  let recentNotesMarkup = notes ? (
    notes.map((note) => <Note note={note} key={note.noteId} />)
  ) : (
    <CircularProgress className={classes.progress} />
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
