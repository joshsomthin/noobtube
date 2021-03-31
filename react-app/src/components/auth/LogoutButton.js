import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/session";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logoutUser());
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
