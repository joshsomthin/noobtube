import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadVidoes } from "../../store/videos";

const GameVideos = () => {
  const { gameId } = useParams();
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos.videos);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(loadVidoes(gameId)).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && <div>Games Here</div>;
};

export default GameVideos;
