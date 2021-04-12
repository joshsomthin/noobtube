import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { signUpUser } from "../../store/session";
import "./LoginForm.css";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const stateErrors = useSelector((state) => state.errors);
  const [errors, setErrors] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await dispatch(signUpUser(username, email, password));
      if (user.errors) {
        return;
      } else {
        history.push("/");
      }
    }
    setErrors(["Passwords do not match"]);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  useEffect(() => {
    if (stateErrors) {
      setErrors(stateErrors.auth);
    }
  }, [stateErrors]);
  return (
    <div className="container">
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <form onSubmit={onSignUp}>
        <div>
          {errors ? (
            <ul>
              {errors.map((err) => (
                <li>{err}</li>
              ))}
            </ul>
          ) : (
            ""
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="email"
            label="Username"
            name="Username"
            autoFocus
            onChange={updateUsername}
            value={username}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            label="Password"
            name="password"
            autoComplete="email"
            value={password}
            onChange={updatePassword}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            label="Confirm Password"
            name="password"
            autoComplete="email"
            value={repeatPassword}
            onChange={updateRepeatPassword}
          />
        </div>
        <Button type="submit" fullWidth variant="contained" color="primary">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
