import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, ButtonGroup, TextField } from "@material-ui/core";
import { useSelector } from "react-redux";
import { submitComment } from "../../store/videos";
import { manageLoginModal } from "../../store/modal";
import CommentSection from "../CommentSection";
import "./CommentForm.css";

const CommentForm = () => {
  const dispatch = useDispatch();
  const [showButtons, setShowButtons] = useState(false);
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.user?.user?.id);
  const videoId = useSelector((state) => state.videos.current?.id);
  const comments = useSelector((state) => state.videos?.comments);

  const checkValidations = async (e) => {
    if (!user) return await dispatch(manageLoginModal(true));
    setShowButtons(true);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    await dispatch(submitComment(videoId, user, comment));
    setComment("");
  };

  const updateComment = (e) => {
    setComment(e.target.value);
  };

  const handleCancel = (e) => {
    setComment("");
    setShowButtons(false);
  };

  return (
    <>
      <div className="comment-section">
        {comments ? comments?.length : 0} Comments
      </div>
      <form onSubmit={handleSumbit}>
        <TextField
          onFocus={checkValidations}
          fullWidth
          value={comment}
          onChange={updateComment}
          label="Add a public comment..."
          variant="filled"
        ></TextField>
        {showButtons ? (
          <ButtonGroup>
            <Button
              type="button"
              onClick={handleCancel}
              variant="text"
              color="primary"
            >
              Cancel
            </Button>
            {!comment ? (
              <Button variant="contained" color="primary" disabled>
                Comment
              </Button>
            ) : (
              <Button type="submit" variant="contained" color="primary">
                Comment
              </Button>
            )}
          </ButtonGroup>
        ) : (
          ""
        )}
      </form>
      <CommentSection />
    </>
  );
};

export default CommentForm;
