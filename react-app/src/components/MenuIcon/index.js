import React from "react";
import { NavLink } from "react-router-dom";

const MenuIcon = () => {
  return (
    <div>
      <a href="/">
        <i className="fas fa-bars accent"></i>
      </a>
      <NavLink to="/" exact={true} activeClassName="active" className="button">
        Home
      </NavLink>
    </div>
  );
};

export default MenuIcon;
