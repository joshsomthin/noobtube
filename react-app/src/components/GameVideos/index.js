import React from "react";
import VideoCard from "../VideoCard";
import "./GameVideos.css";

const GameVideos = ({ videos }) => {
  return (
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
  );
};

export default GameVideos;
