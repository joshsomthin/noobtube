import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { updateSubscribe, updateUnsubscribe } from "../../store/session";
import Button from "@material-ui/core/Button";
import SignupModal from "../SignupModal";
import "./SubscribeButton.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiButton-root": {
      background: "#9d07c3",
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 48,
      padding: "0 30px",
    },
  },
}));

const SubscribeButton = ({ channelId }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const alreadySubscribed = user?.subscriptions?.includes(channelId);

  const StyledSubscribeButton = withStyles({
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
  const StyledUnsubscribeButton = withStyles({
    root: {
      background: "#4e4e50",
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
    dispatch(updateSubscribe(user.id, channelId));
  };

  const unSubscribe = (e) => {
    dispatch(updateUnsubscribe(user.id, channelId));
  };

  const subscribed = alreadySubscribed ? (
    <StyledUnsubscribeButton onClick={unSubscribe}>
      Unsubscribe
    </StyledUnsubscribeButton>
  ) : (
    <StyledSubscribeButton onClick={subscribe}>Subscribe</StyledSubscribeButton>
  );

  return user?.id ? (
    subscribed
  ) : (
    <SignupModal className={classes.root} text="SUBSCRIBE" />
  );
};

export default SubscribeButton;
