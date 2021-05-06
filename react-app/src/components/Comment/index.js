import React, { useState } from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const Comment = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [comment, setComment] = useState("");
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
        onFocus={() => setShowButtons(true)}
        value={comment}
        onChange={updateComment}
        label="Add a public comment..."
        variant="filled"
      ></TextField>
      {showButtons ? (
        <ButtonGroup>
          <Button
            type="button"
            classes
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
