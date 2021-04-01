import React from "react";
import { NavLink } from "react-router-dom";

const MenuIcon = () => {
  return (
    <div>
      <a href="/">
        <i className="fas fa-bars"></i>
      </a>
      <NavLink to="/" exact={true} activeClassName="active">
        Home
      </NavLink>
    </div>
  );
};

export default MenuIcon;
