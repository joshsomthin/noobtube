import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const MenuIcon = () => {
  const user = useSelector((state) => state.user?.user?.id);
  return (
    <div>
      <a href="/">
        <i className="fas fa-bars accent"></i>
      </a>
      <NavLink to="/" exact={true} activeClassName="active" className="button">
        Home
      </NavLink>
      {user ? (
        <div>
          <NavLink to={`/${user}/subscriptions`}>Subscriptions</NavLink>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MenuIcon;
