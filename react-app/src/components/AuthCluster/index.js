import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import {
  Menu,
  MenuItem,
  Button,
  ButtonGroup,
  withStyles,
} from "@material-ui/core";
import LoginModal from "../LoginModal";
import SignupModal from "../SignupModal";
import "./AuthCluster.css";

const AuthCluster = () => {
  const logged = useSelector((state) => state.user.user);
  const [anchorEl, setanchorEl] = useState(null);

  const handleClick = (e) => {
    setanchorEl(e.currentTarget);
  };
  const handleClose = (e) => {
    setanchorEl(null);
  };

  const StyledMenu = withStyles({
    paper: {
      border: "1px solid #d3d4d5",
      backgroundColor: "#26262b",
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...props}
    />
  ));

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      "&:focus": {
        backgroundColor: theme.palette.primary.main,
      },
    },
  }))(MenuItem);

  const loggedIn = (
    <>
      <div className="icon-div" onClick={handleClick}>
        <AccountCircleRoundedIcon fontSize="inherit" className="button" />
      </div>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={handleClose}>
          <NavLink to={`/${logged?.id}/subscriptions`}>Subscriptions</NavLink>
        </StyledMenuItem>
        <StyledMenuItem onClick={handleClose}>
          <LogoutButton />
        </StyledMenuItem>
      </StyledMenu>
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
