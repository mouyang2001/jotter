import React, { useState, useEffect } from 'react'

import Grid from '@material-ui/core/Grid';
// import axios from '../util/axios';
import axios from '../util/axios';

import Note from '../components/Note';

export default function Home() {
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    axios.get("/notes")
      .then(res => {
        setNotes(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  let recentNotesMarkup = notes ? (
    notes.map((note, i) => <Note note={note} key={i}/>)
  ) : <p>loading</p>;

  return (
    <div>
      <Grid container>
        <Grid item sm={8} xs={12}>
          <p>Content</p>
          {recentNotesMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile</p>
        </Grid>
      </Grid>
    </div>
  );
}
