import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { loadChannelVideos } from "../../store/videos";
import GameVideos from "../GameVideos";

const SubscriptionBox = () => {
  const { channelId } = useParams();
  const dispatch = useDispatch();
  const channelVids = useSelector((state) => state.videos.videos);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(loadChannelVideos(channelId)).then(() => setIsLoaded(true));
  }, [dispatch, userId]);

  return isLoaded && <GameVideos videos={channelVids} />;
};

export default SubscriptionBox;
