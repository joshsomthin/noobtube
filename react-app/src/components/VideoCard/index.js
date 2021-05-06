import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setCurrentVideo, addNewVideo } from "../../store/videos";
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
  genreId,
}) => {
  const dispatch = useDispatch();
  const updateVideo = async (e) => {
    if (video?.channel_name) await dispatch(addNewVideo(video));
    if (video) await dispatch(setCurrentVideo(video));
  };
  return (
    <div onClick={updateVideo} className="video-card" style={{ width: "100%" }}>
      <NavLink key={idx} to={link}>
        <div>
          <img
            alt="video card"
            width={width}
            height={height}
            style={{ objectFit: "cover", aspectRatio: "16/9" }}
            src={image_path}
          />
        </div>
        <div>{game}</div>
        {views !== null ? <div>{views} views</div> : ""}
      </NavLink>
    </div>
  );
};

export default VideoCard;
