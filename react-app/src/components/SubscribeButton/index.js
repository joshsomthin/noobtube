import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { updateSubscriptions } from "../../store/session";
import Button from "@material-ui/core/Button";
import "./SubscribeButton.css";

const SubscribeButton = ({ channelId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
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

  const subscribe = (e) => {
    if (!user?.id) {
      return history.push("/login");
    }
    dispatch(updateSubscriptions(user.id, channelId));
  };

  return <StyledButton onClick={subscribe}>Subscribe</StyledButton>;
};

export default SubscribeButton;
