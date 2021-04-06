import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setCurrentVideo } from "../../store/videos";
import "./VideoCard.css";

const VideoCard = ({
  link,
  idx,
  game,
  image_path,
  width = "360",
  height = "200",
  views = null,
  video = null,
}) => {
  const dispatch = useDispatch();
  const updateVideo = async (e) => {
    if (video) await dispatch(setCurrentVideo(video));
  };
  return (
    <div
      onClick={updateVideo}
      className="video-card"
      style={{ width: "360px" }}
    >
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
