import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { loadSubscriptions } from "../../store/videos";
import GameVideos from "../GameVideos";

const SubscriptionBox = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const subs = useSelector((state) => state.videos.videos);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(loadSubscriptions(userId)).then(() => setIsLoaded(true));
  }, [dispatch, userId]);

  return isLoaded && <GameVideos videos={subs} />;
};

export default SubscriptionBox;
