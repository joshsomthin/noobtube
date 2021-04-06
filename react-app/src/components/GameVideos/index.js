import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadVideos } from "../../store/videos";
import VideoCard from "../VideoCard";
import "./GameVideos.css";

const GameVideos = () => {
  const { gameId } = useParams();
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos.videos);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(loadVideos(gameId)).then(() => setIsLoaded(true));
  }, [dispatch, gameId]);

  return (
    isLoaded && (
      <div>
        <div className="videocard-container">
          {videos.map((video, idx) => {
            return (
              <VideoCard
                key={idx}
                link={`/videos/${video.id}`}
                image_path={video.image_path}
                game={video.title}
                views={video.views}
                video={video}
              />
            );
          })}
        </div>
      </div>
    )
  );
};

export default GameVideos;
