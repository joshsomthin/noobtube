import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, ButtonGroup, TextField } from "@material-ui/core";
import { commentStatus, submitEditComment } from "../../store/videos";

const EditComment = ({ body, id, video_id }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState(body);

  const handleSumbit = async (e) => {
    e.preventDefault();
    await dispatch(submitEditComment(id, comment, video_id));
  };

  const updateComment = (e) => {
    setComment(e.target.value);
  };

  const handleCancel = async (e) => {
    await dispatch(commentStatus(null));
  };

  return (
    <>
      <form style={{ width: "100%" }} onSubmit={handleSumbit}>
        <TextField
          fullWidth
          value={comment}
          onChange={updateComment}
          variant="filled"
        ></TextField>
        <ButtonGroup>
          <Button
            type="button"
            onClick={handleCancel}
            variant="filled"
            color="primary"
          >
            Cancel
          </Button>
          <Button type="submit" variant="text" color="primary">
            Update
          </Button>
        </ButtonGroup>
      </form>
    </>
  );
};
export default EditComment;
