// react
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// redux
import { useDispatch, useSelector } from "react-redux";
import userActions from "../redux/actions/userActions"; 

// local
import AppIcon from "../images/icon.png";

const useStyles = makeStyles({
  form: {
    textAlign: "center",
  },
  pageTitle: {
    margin: "20px auto 20px auto",
  },
  logo: {
    margin: "20px auto 20px auto",
    width: "50%",
    height: "auto",
    borderRadius: "15%",
  },
  textField: {
    margin: "10px auto 10px auto",
  },
  button: {
    margin: "20px auto 20px auto",
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: "10px",
  },
  progress: {
    margin: "20px auto 20px auto",
  },
});

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [handle, setHandle] = useState("");

  const loading = useSelector(state => state.ui.loading);
  const errors = useSelector(state => state.ui.errors);

  const dispatch = useDispatch();

  const classes = useStyles();
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUserData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      handle: handle
    };

    dispatch(userActions.signupUser(newUserData, history));
  };

  const handleChange = (event) => {
    if (event.target.name === "email") setEmail(event.target.value);
    if (event.target.name === "handle") setHandle(event.target.value);
    if (event.target.name === "password") setPassword(event.target.value);
    if (event.target.name === "confirmPassword") setConfirmPassword(event.target.value);
  };

  let customErrorMarkup = errors.general ? (
    <Typography variant="body2" className={classes.customError}>
      {errors.general}
    </Typography>
  ) : null;

  let loginMarkup = loading ? (
    <CircularProgress className={classes.progress} />
  ) : (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      className={classes.button}
    >
      Signup
    </Button>
  );

  return (
    <Grid container className={classes.form}>
      <Grid item sm={4} />
      <Grid item sm={4}>
        <img src={AppIcon} alt="jotterLogo" className={classes.logo} />
        <Typography variant="h3" className={classes.pageTitle}>
          Signup to Jotter
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
            id="handle"
            name="handle"
            type="text"
            label="Username"
            className={classes.textField}
            helperText={errors.handle}
            error={errors.handle ? true : false}
            value={handle}
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
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm password"
            className={classes.textField}
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
            value={confirmPassword}
            onChange={handleChange}
            fullWidth
          />
          {customErrorMarkup}
          {loginMarkup}
          <br />
          <small>
            Already have an account? Login <Link to="/signup">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm={4} />
    </Grid>
  );
}
