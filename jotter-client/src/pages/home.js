import React, { useState, useEffect } from 'react'

import Grid from '@material-ui/core/Grid';
// import axios from '../util/axios';
import axios from '../util/axios';

import Note from '../components/Note';
import ProfileCard from '../components/ProfileCard';

export default function Home(props) {
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    axios.get("/notes")
      .then(res => {
        setNotes(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  let recentNotesMarkup = notes ? (
    notes.map((note) => <Note note={note} key={note.noteId}/>)
  ) : <p>loading</p>;

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
