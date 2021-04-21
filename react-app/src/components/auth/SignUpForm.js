import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Typography, withStyles } from "@material-ui/core";
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

  const StyledTextField = withStyles({
    root: {
      backgroundColor: "#a0a0a0",
      opacity: "60%",
      borderRadius: "4px",
    },
  })(TextField);

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
          <StyledTextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            type="text"
            label="Username"
            name="username"
            autoFocus
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <StyledTextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            type="email"
            label="Email Address"
            name="email"
            value={username}
            onChange={updateUsername}
          />
        </div>
        <div>
          <StyledTextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            type="password"
            label="Password"
            name="password"
            value={password}
            onChange={updatePassword}
          />
        </div>
        <div>
          <StyledTextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            type="password"
            label="Confirm Password"
            name="confirmpassword"
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
