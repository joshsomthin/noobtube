import React from "react";
import { useSelector } from "react-redux";
import Comment from "../Comment";

const CommentSection = () => {
  const comments = useSelector((state) => state.videos?.comments);
  return comments ? (
    <div>
      {comments.map((comment) => {
        return (
          <Comment
            id={comment.id}
            body={comment.body}
            user={comment.user}
            user_id={comment.user_id}
            date={comment.date}
          />
        );
      })}
    </div>
  ) : (
    <h1>Be the first to add a comment</h1>
  );
};

export default CommentSection;
