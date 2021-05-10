import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import UsersList from "./components/UsersList";
import User from "./components/User";
import Home from "./components/Home";
import VideoPage from "./components/VideoPage";
import SubscriptionBox from "./components/SubscriptionBox";
import GenreVideos from "./components/GenreVideos";
import SearchResults from "./components/SearchResults";
import CommentForm from "./components/CommentForm";
import Modal from "@material-ui/core/Modal";
import { manageSignupModal, manageLoginModal } from "./store/modal";

function App() {
  const [loaded, setLoaded] = useState(false);
  const openSignUp = useSelector((state) => state.modal.status.signup);
  const openLogin = useSelector((state) => state.modal.status.login);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }
  const handleSignUpClose = async () => {
    return await dispatch(manageSignupModal());
  };

  const handleLoginClose = async () => {
    return await dispatch(manageLoginModal());
  };

  return (
    <BrowserRouter>
      <NavBar />
      <Modal open={openSignUp} onClose={handleSignUpClose}>
        <SignUpForm />
      </Modal>
      <Modal open={openLogin} onClose={handleLoginClose}>
        <LoginForm />
      </Modal>
      <div
        className="body-div"
        style={{ paddingTop: "70px", bottom: "0", top: "0" }}
      >
        <Switch>
          <Route path="/login" exact={true}>
            <LoginForm />
          </Route>
          <Route path="/signup" exact={true}>
            <SignUpForm />
          </Route>
          <Route path="/users" exact={true}>
            <UsersList />
          </Route>
          <Route path="/users/:userId" exact={true}>
            <User />
          </Route>
          <Route path="/games/:gameId">
            <GenreVideos />
          </Route>
          <Route path="/videos/:videoId">
            <VideoPage />
          </Route>
          <Route path="/" exact={true}>
            <Home />
          </Route>
          <Route path="/:userId/subscriptions">
            <SubscriptionBox />
          </Route>
          <Route path="/search/:searchTerm">
            <SearchResults />
          </Route>
          <Route path="/testing">
            <CommentForm />
          </Route>
          <Route path="/channel/:channelId/videos">{`Welcome to the channel`}</Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
