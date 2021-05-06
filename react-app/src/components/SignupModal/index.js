import React from "react";
import { useDispatch } from "react-redux";
import { manageSignupModal } from "../../store/modal";
import Button from "@material-ui/core/Button";

const SignupModal = ({ text = "SignUp", classes = "" }) => {
  const dispatch = useDispatch();
  const handleOpen = async () => {
    return await dispatch(manageSignupModal(true));
  };

  return (
    <>
      <Button
        classes={classes}
        variant="text"
        type="button"
        onClick={handleOpen}
      >
        {text}
      </Button>
    </>
  );
};

export default SignupModal;
