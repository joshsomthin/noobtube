import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import "./Comment.css";
import { ButtonGroup } from "@material-ui/core";

const editDeleteButtons = (
  <ButtonGroup>
    <button>Edit</button>
    <button>Delete</button>
  </ButtonGroup>
);

const Comment = ({ body, user, user_id, date }) => {
  const loggedInUser = useSelector((state) => state?.user?.user?.id);
  return (
    <div className="comment">
      <div className="account-icon">
        <NavLink to={`/user/${user_id}`}>
          <AccountCircleRoundedIcon />
        </NavLink>
      </div>
      <div className="text">
        <div className="username">
          <NavLink to={`/user/${user_id}`}>
            <span>{user}</span>
          </NavLink>
          <span className="date">
            {" "}
            {date !== 0 ? date : "today"} {date === 0 ? "" : "days ago"}
          </span>
        </div>
        <div className="body">
          <span>{body}</span>
          {loggedInUser === user_id ? editDeleteButtons : ""}
        </div>
      </div>
    </div>
  );
};

export default Comment;
