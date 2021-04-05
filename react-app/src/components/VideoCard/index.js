import React from "react";
import { NavLink } from "react-router-dom";
import "./VideoCard.css";

const VideoCard = ({
  link,
  idx,
  game,
  image_path,
  width = "360",
  height = "200",
  views = null,
}) => {
  return (
    <div className="video-card" style={{ width: "360px" }}>
      <NavLink key={idx} to={link}>
        <img
          alt="video card"
          width={width}
          height={height}
          style={{ objectFit: "cover" }}
          src={image_path}
        />
        <div>{game}</div>
        {views !== null ? <div>{views} views</div> : ""}
      </NavLink>
    </div>
  );
};

export default VideoCard;
