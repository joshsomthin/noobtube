import React, { useState } from "react";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import { Menu, Button, ButtonGroup } from "@material-ui/core";
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
    <ButtonGroup>
      <LoginModal />
      <SignupModal />
    </ButtonGroup>
  );

  return logged ? loggedIn : loggedOut;
};

export default AuthCluster;
