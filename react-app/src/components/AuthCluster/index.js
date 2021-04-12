import React, { useState } from "react";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import LoginModal from "../LoginModal";
import SignupModal from "../SignupModal";
import "./AuthCluster.css";

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
    <div className="log">
      <LoginModal />
      <SignupModal />
    </div>
  );

  return logged ? loggedIn : loggedOut;
};

export default AuthCluster;
