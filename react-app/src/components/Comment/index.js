import React from "react";
import { NavLink } from "react-router-dom";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import "./Comment.css";

const Comment = ({ body, user, user_id, date }) => {
  return (
    <div className="comment">
      <div className="account-icon">
        <NavLink to={`/user/${user_id}`}>
          <AccountCircleRoundedIcon />
        </NavLink>
      </div>
      <div>
        <div className="username">
          <NavLink to={`/user/${user_id}`}>
            <span>{user}</span>
          </NavLink>
          <span className="date">
            {" "}
            {date !== 0 ? date : "today"} {date === 0 ? "" : "days ago"}
          </span>
        </div>
        <span>{body}</span>
      </div>
    </div>
  );
};

export default Comment;
