import React, { useState } from "react";
import { TextField, Button, Typography, makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { userLogin } from "../../store/session";
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

const LoginForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await dispatch(userLogin(email, password));
    if (!user.errors) {
      return;
    } else {
      setErrors(user.errors);
    }
  };

  const loginDemo = async (e) => {
    e.preventDefault();
    const user = await dispatch(userLogin("Demo@aa.io", "password"));
    if (!user.errors) {
      return;
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="container">
      <Typography component="h1" variant="h5">
        Log in
      </Typography>
      <form className={classes.root} onSubmit={onLogin}>
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div>
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            type="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <TextField
            variant="filled"
            margin="normal"
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
        <Button
          className="text-box"
          style={{ marginBottom: "15px", marginTop: "8px" }}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Login
        </Button>
        <Button
          onClick={loginDemo}
          fullWidth
          variant="contained"
          color="primary"
        >
          Demo User
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
