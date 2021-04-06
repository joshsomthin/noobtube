import React from "react";
import { useSelector } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "./SubscribeButton.css";

const SubscribeButton = () => {
  const user = useSelector((state) => state.user);
  const StyledButton = withStyles({
    root: {
      background: "#9d07c3",
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 48,
      padding: "0 30px",
    },
    label: {
      textTransform: "uppercase",
    },
  })(Button);

  const subscribe = (e) => {};

  return <StyledButton onClick={subscribe}>Subscribe</StyledButton>;
};

export default SubscribeButton;
