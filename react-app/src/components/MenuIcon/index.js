import React from "react";
import { NavLink } from "react-router-dom";
import "./MenuIcon.css";

const MenuIcon = () => {
  return (
    <>
      <NavLink to="/" exact={true} className="logo">
        <img
          alt="icon"
          src="https://noobtube.s3-us-west-2.amazonaws.com/NoobTube_Logo_V5.png"
          height="100%"
        />
      </NavLink>
    </>
  );
};

export default MenuIcon;
