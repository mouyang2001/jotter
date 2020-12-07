import React, {useState} from "react";
import {Link, useHistory} from 'react-router-dom'

import axios from '../util/axios';

import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from "@material-ui/core/CircularProgress";

import AppIcon from '../images/icon.png';

const useStyles = makeStyles({
  form: {
    textAlign: 'center',
  },
  pageTitle: {
    margin: '20px auto 20px auto'
  },
  logo: {
    margin: '20px auto 20px auto',
    width: '50%',
    height: 'auto',
    borderRadius: '15%',
  },
  textField: {
    margin: '10px auto 10px auto',
  },
  button: {
    margin: '20px auto 20px auto',
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: '10px',
  },
  progress: {
    margin: '20px auto 20px auto',
  }
});

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const classes = useStyles();

  const history = useHistory();

  const handleSubmit = (event) => {
    //prevent default behavior ie reload
    event.preventDefault();

    const userData = {
      email: email,
      password: password
    }

    //clear previous errors
    setErrors({});
    setLoading(true);
    axios.post('/login', userData)
      .then(res => {
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
        setLoading(false);
        history.push('/');
      })
      .catch(err => {
        console.log(err.response.data);
        setErrors(err.response.data);
        setLoading(false);
      });
  }

  const handleChange = (event) => {
    if (event.target.name === 'email') setEmail(event.target.value);
    if (event.target.name === 'password') setPassword(event.target.value);
  }

  let loginMarkup = loading ? (
    <CircularProgress className={classes.progress} />
  ) : (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      className={classes.button}
    >
      Login
    </Button>
  );

  let customErrorMarkup = errors.general ? (
    <Typography variant="body2" className={classes.customError}>
      {errors.general}
    </Typography>
  ) : null;

  return (
    <Grid container className={classes.form}>
      <Grid item sm={4} />
      <Grid item sm={4}>
        <img src={AppIcon} alt="jotterLogo" className={classes.logo} />
        <Typography variant="h3" className={classes.pageTitle}>
          Login to Jotter
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            helperText={errors.email}
            error={errors.email ? true : false}
            value={email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            helperText={errors.password}
            error={errors.password ? true : false}
            value={password}
            onChange={handleChange}
            fullWidth
          />
          {customErrorMarkup}
          {loginMarkup}
          <br />
          <small>
            Don't have an account? Signup <Link to="/signup">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm={4} />
    </Grid>
  );
}
