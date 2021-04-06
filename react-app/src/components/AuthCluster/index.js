import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";

const AuthCluster = () => {
  const logged = useSelector((state) => state.user.user);
  const [accountClick, setAccountClick] = useState(null);

  const handleClick = (e) => {
    setAccountClick(e.currentTarget);
  };
  const handleClose = (e) => {
    setAccountClick(null);
  };

  const loggedIn = (
    <>
      <Button aria-controls="profile-menu" onClick={handleClick}>
        <AccountCircleRoundedIcon className="button" />
      </Button>
      <Menu
        id="profile-menu"
        anchorEl="accountClick"
        keepMounted
        open={Boolean(accountClick)}
        onClose={handleClose}
      >
        <LogoutButton />
      </Menu>
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

  return logged ? loggedIn : loggedOut;
};

export default AuthCluster;
