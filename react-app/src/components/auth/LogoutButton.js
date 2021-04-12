import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/session";
import { Button } from "@material-ui/core";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logoutUser());
  };

  return (
    <Button size="small" variant="text" fullWidth onClick={onLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
