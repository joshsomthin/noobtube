import React, { useState, useEffect, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import { deleteComment } from "../../store/videos";
import { ButtonGroup, Button } from "@material-ui/core";
import EditComment from "../EditComment";
import { commentStatus } from "../../store/videos";
import "./Comment.css";

const Comment = ({ video_id, id, body, user, user_id, date }) => {
  const dispatch = useDispatch();
  const editComment = useSelector((state) => state.videos?.commentStatus);
  const loggedInUser = useSelector((state) => state?.user?.user?.id);
  const openEdit = async () => {
    await dispatch(commentStatus(id));
  };

  const removeComment = async () => {
    await dispatch(deleteComment(id, video_id));
  };

  useEffect(() => {
    commentStatus(false);
  }, []);

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
          {editComment === id ? (
            <EditComment body={body} id={id} video_id={video_id} />
          ) : (
            <span>{body}</span>
          )}
          {loggedInUser === user_id && !editComment ? (
            <ButtonGroup>
              <Button variant="text" onClick={openEdit}>
                Edit
              </Button>
              <Button variant="text" onClick={removeComment}>
                Delete
              </Button>
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
