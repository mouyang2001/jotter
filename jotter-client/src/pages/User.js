import React, {useEffect, useState} from 'react';

import Grid from '@material-ui/core/Grid';

import {useDispatch, useSelector} from 'react-redux';
import userActions from '../redux/actions/dataActions';

import axios from "../util/axios";

import StaticProfile from '../components/StaticProfile';
import Note from '../components/Note';

export default function User(props) {

  const [profile, setProfile] = useState(null);

  const dispatch = useDispatch();

  const loading = useSelector(state => state.ui.loading);
  const notes = useSelector(state => state.data.notes);

  useEffect(() => {
    const handle = props.match.params.handle;
    dispatch(userActions.getUserData(handle));

    axios
      .get(`/user/${handle}`)
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  const notesMarkup = loading ? (
    <p>Loading data...</p>
  ) : notes === null ? (
    <p>No notes from this user</p>
  ) : (
    notes.map(note => <Note key={note.noteId} note={note} />)
  );

  return (
    <Grid container>
      <Grid item sm={8} xs={12}>
        {notesMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile === null ? (
          <p>Loading profile...</p>
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
    </Grid>
  );
}
