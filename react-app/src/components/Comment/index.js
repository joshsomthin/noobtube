import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, ButtonGroup, TextField } from "@material-ui/core";
import { useSelector } from "react-redux";
import { submitComment } from "../../store/videos";
import { manageLoginModal } from "../../store/modal";

const Comment = () => {
  const dispatch = useDispatch();
  const [showButtons, setShowButtons] = useState(false);
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.user?.user?.id);
  const videoId = useSelector((state) => state.videos.current?.id);

  const checkValidations = async (e) => {
    if (!user) return await dispatch(manageLoginModal(true));
    setShowButtons(true);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    await dispatch(submitComment(1, user, comment));
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
    <form onSubmit={handleSumbit}>
      <TextField
        onFocus={checkValidations}
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
  );
};

export default Comment;
