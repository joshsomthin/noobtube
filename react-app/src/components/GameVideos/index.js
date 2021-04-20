import React from "react";
import VidCard from "../VidCard";
import "./GameVideos.css";

const GameVideos = ({ videos }) => {
  return (
    <div className="grid-container">
      <div className="videocard-container">
        {videos.map((video, idx) => {
          return (
            <VidCard
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
