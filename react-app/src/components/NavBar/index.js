import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./NavBar.css";

const NavBar = ({ setAuthenticated }) => {
  return (
    <nav className="navbar">
      <div>
        <a href="/">
          <i className="fas fa-bars"></i>
        </a>
        <NavLink to="/" exact={true} activeClassName="active">
          Home
        </NavLink>
      </div>
      <div className="search-div">
        <input></input>
        <button>
          <img
            className="search-icon"
            src={process.env.PUBLIC_URL + "/search.jpg"}
            alt="search"
          />
        </button>
      </div>
      <div>
        <NavLink to="/login" exact={true} activeClassName="active">
          Login
        </NavLink>

        <NavLink to="/sign-up" exact={true} activeClassName="active">
          Sign Up
        </NavLink>

        <LogoutButton setAuthenticated={setAuthenticated} />
      </div>
    </nav>
  );
};

export default NavBar;
