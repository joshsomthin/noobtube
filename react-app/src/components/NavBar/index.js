import React from "react";
import MenuIcon from "../MenuIcon";
import Search from "../Search";
import AuthCluster from "../AuthCluster";
import "./NavBar.css";
import { Toolbar, AppBar } from "@material-ui/core";

const NavBar = () => {
  return (
    <AppBar style={{ backgroundColor: "#4e4e50" }} className="appbar">
      <Toolbar className="navbar">
        <MenuIcon />
        <Search />
        <AuthCluster />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
