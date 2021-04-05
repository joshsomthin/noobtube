import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadVidoes } from "../../store/videos";
import VideoCard from "../VideoCard";
import "./GameVideos.css";

const GameVideos = () => {
  const { gameId } = useParams();
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos.videos);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(loadVidoes(gameId)).then(() => setIsLoaded(true));
  }, [dispatch, gameId]);

  return (
    isLoaded && (
      <div>
        <div className="video-container">
          {videos.map((video) => {
            return (
              <VideoCard
                link={`/videos/${video.id}`}
                image_path={video.thumbnail}
                game={video.title}
                views={video.views}
              />
            );
          })}
        </div>
      </div>
    )
  );
};

export default GameVideos;
