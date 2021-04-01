import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";

const AuthCluster = () => {
  const logged = useSelector((state) => state.user.user);

  const loggedIn = (
    <>
      <a href="" onClick={""}>
        <AccountCircleRoundedIcon />
      </a>
      <LogoutButton />
    </>
  );

  const loggedOut = (
    <div>
      <NavLink to="/login" exact={true} activeClassName="active">
        Login
      </NavLink>

      <NavLink to="/signup" exact={true} activeClassName="active">
        Sign Up
      </NavLink>
    </div>
  );

  useEffect(() => {
    console.log(logged);
  }, [logged]);
  return logged ? loggedOut : loggedIn;
};

export default AuthCluster;
