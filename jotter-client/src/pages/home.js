import React, { useState, useEffect } from 'react'

import Grid from '@material-ui/core/Grid';
// import axios from '../util/axios';
import axios from 'axios';

export default function Home() {

  useEffect(() => {
    axios
      .get("https://us-central1-jotter-8af9d.cloudfunctions.net/api/notes")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    
  }, []);

  return (
    <div>
      <Grid container>
        <Grid item sm={8} xs={12}>
          <p>Content</p>
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile</p>
        </Grid>
      </Grid>
    </div>
  );
}
