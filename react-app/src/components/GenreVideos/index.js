import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadVideos } from "../../store/videos";
import GameVideos from "../GameVideos";

const GenreVideos = () => {
  const { gameId } = useParams();
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos.videos);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(loadVideos(gameId)).then(() => setIsLoaded(true));
  }, [dispatch, gameId]);

  return isLoaded && <GameVideos videos={videos} />;
};

export default GenreVideos;
