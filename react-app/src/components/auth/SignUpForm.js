import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Typography, makeStyles } from "@material-ui/core";
import { signUpUser } from "../../store/session";
import "./LoginForm.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      backgroundColor: "#a0a0a0",
      opacity: "60%",
      borderRadius: "4px",
    },
  },
}));

const SignUpForm = () => {
  const dispatch = useDispatch();
  const stateErrors = useSelector((state) => state.errors);
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const classes = useStyles();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await dispatch(signUpUser(username, email, password));
      if (!user.errors) {
        return;
      } else {
        setErrors(["Passwords do not match"]);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
    console.log(username);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
    console.log(repeatPassword);
  };

  useEffect(() => {
    if (stateErrors) {
      setErrors(stateErrors.auth);
    }
  }, [stateErrors]);
  return (
    <div className="container">
      <div style={{ marginBottom: "15px" }}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
      </div>
      <form
        className={classes.root}
        onSubmit={onSignUp}
        autoComplete="off"
        noValidate
      >
        <div>
          {errors?.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div className="text-box">
          <TextField
            variant="filled"
            required
            fullWidth
            id="userName"
            label="Username"
            name="username"
            autoFocus
            value={username}
            onChange={updateUsername}
          />
        </div>
        <div className="text-box">
          <TextField
            variant="filled"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className="text-box">
          <TextField
            variant="filled"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={updatePassword}
          />
        </div>
        <div className="text-box">
          <TextField
            variant="filled"
            required
            fullWidth
            name="confirm-password"
            label="Confirm Password"
            type="password"
            id="confirm-password"
            autoComplete="confirm-password"
            value={repeatPassword}
            onChange={updateRepeatPassword}
          />
        </div>
        <Button
          className="text-box"
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          // className={classes.submit}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
