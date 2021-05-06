import React from "react";
import { useDispatch } from "react-redux";
import { manageLoginModal } from "../../store/modal";
import Button from "@material-ui/core/Button";
import "./LoginModal.css";

const LoginModal = () => {
  const dispatch = useDispatch();

  const handleOpen = async () => {
    return await dispatch(manageLoginModal(true));
  };

  return (
    <>
      <Button
        variant="contained"
        type="button"
        color="primary"
        onClick={handleOpen}
      >
        Login
      </Button>
    </>
  );
};

export default LoginModal;
