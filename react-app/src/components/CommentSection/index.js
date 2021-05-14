import React from "react";
import { useSelector } from "react-redux";
import Comment from "../Comment";

const CommentSection = () => {
  const comments = useSelector((state) => state.videos?.comments);
  return (
    <div style={{ marginBottom: "40px" }}>
      {comments ? (
        <div>
          {comments.map((comment) => {
            return (
              <Comment
                video_id={comment.video_id}
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
      )}
    </div>
  );
};

export default CommentSection;
