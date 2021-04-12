import React from "react";
import { useState } from "react";
import Modal from "@material-ui/core/Modal";
import SignUpForm from "../auth/SignUpForm";
import Button from "@material-ui/core/Button";

const SignupModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button variant="text" type="button" onClick={handleOpen}>
        Signup
      </Button>
      <Modal open={open} onClose={handleClose}>
        <SignUpForm />
      </Modal>
    </>
  );
};

export default SignupModal;
