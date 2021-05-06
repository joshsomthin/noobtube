import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, ButtonGroup, TextField } from "@material-ui/core";
import { useSelector } from "react-redux";
import LoginModal from "../LoginModal";

const Comment = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.user?.user?.id);

  const checkValidations = (e) => {
    if (!user) return <LoginModal status={true} />;
    setShowButtons(true);
  };

  const handleSumbit = (e) => {
    e.preventDefault();
  };

  const updateComment = (e) => {
    setComment(e.target.value);
  };

  const handleCancel = (e) => {
    setComment("");
    setShowButtons(false);
  };

  return (
    <form>
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
            <Button variant="contained" color="primary">
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