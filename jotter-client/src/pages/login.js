import React, {useState} from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import AppIcon from '../images/icon.png';

const useStyles = makeStyles({
  form: {
    textAlign: 'center',
  },
  pageTitle: {

  },
  logo: {
    margin: '20px auto 20px auto',

  },
  textField: {

  },
});

export default function Login() {
  const [email, setEmail] = useState('hello');
  const [password, setPassword] = useState('hello');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const classes = useStyles();

  const handleSubmit = (event) => {
    
  }

  const handleChange = (event) => {
    if (event.target.name === 'email') setEmail(event.target.value);
    else if (event.target.name === 'password') setPassword(event.target.password);
  }

  return (
    <Grid container className={classes.form}>
      <Grid item sm={4} />
      <Grid item sm={4}>
        <img src={AppIcon} alt="jotterLogo" className={classes.logo} />
        <Typography variant="h2" className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="password"
            className={classes.textField}
            value={password}
            onChange={handleChange}
            fullWidth
          />
          <Button type="submit">Hello world</Button>
        </form>
      </Grid>
      <Grid item sm={4} />
    </Grid>
  );
}
