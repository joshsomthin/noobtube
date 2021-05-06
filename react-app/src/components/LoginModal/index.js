import React from "react";
import { useState } from "react";
import Modal from "@material-ui/core/Modal";
import LoginForm from "../auth/LoginForm";
import Button from "@material-ui/core/Button";
import "./LoginModal.css";

const LoginModal = ({ status = false }) => {
  const [open, setOpen] = useState(status);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      <Modal open={open} onClose={handleClose}>
        <LoginForm />
      </Modal>
    </>
  );
};

export default LoginModal;
