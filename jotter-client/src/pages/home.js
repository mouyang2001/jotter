// react
import React, { useEffect } from 'react'

// components
import Note from '../components/Note';
import ProfileCard from '../components/ProfileCard';

// material ui
import Grid from '@material-ui/core/Grid';

//redux 
import {useDispatch, useSelector} from 'react-redux';
import dataActions from '../redux/actions/dataActions';

// util
import NoteSkeleton from '../util/NoteSkeleton';

export default function Home() {
  // const [notes, setNotes] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dataActions.getNotes());
    // eslint-disable-next-line
  }, []);

  // the reason why we don't access notes with selector
  // is that it won't re-render when likeCount state changes
  const data = useSelector(state=> state.data);
  const loading = useSelector(state=> state.data.loading);

  let recentNotesMarkup = !loading ? (
    data.notes.map((note) => <Note note={note} key={note.noteId} />)
  ) : (
    <NoteSkeleton/>
  );

  return (
    <Grid container>
      <Grid item sm={8} xs={12}>
        {recentNotesMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <ProfileCard/>
      </Grid>
    </Grid>
  );
}
