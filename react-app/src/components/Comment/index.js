import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import { deleteComment } from "../../store/videos";
import { ButtonGroup } from "@material-ui/core";
import "./Comment.css";

const Comment = ({ video_id, id, body, user, user_id, date }) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state?.user?.user?.id);

  const openEdit = () => {};

  const removeComment = async () => {
    await dispatch(deleteComment(id, video_id));
  };

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
          {loggedInUser === user_id ? (
            <ButtonGroup>
              <button onClick={openEdit}>Edit</button>
              <button onClick={removeComment}>Delete</button>
            </ButtonGroup>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
