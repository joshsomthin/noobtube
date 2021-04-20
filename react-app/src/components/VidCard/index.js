import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCurrentVideo, addNewVideo } from "../../store/videos";
import "./VideoCard.css";

const VidCard = ({
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
  const history = useHistory();
  const [videoId, setVideoId] = useState(link);
  const dispatch = useDispatch();
  const updateVideo = async (e) => {
    if (video?.channel_name) {
      dispatch(addNewVideo(video)).then((res) => setVideoId(res));
      history.push(`/videos/${videoId}`);
    }
    if (video) {
      await dispatch(setCurrentVideo(video));
      history.push(`/videos/${videoId}`);
    }
  };
  return (
    <div
      onClick={updateVideo}
      className="video-card"
      style={{ width: "360px" }}
    >
      <img
        alt="video card"
        width={width}
        height={height}
        style={{ objectFit: "cover" }}
        src={image_path}
      />
      <div>{game}</div>
      {views !== null ? <div>{views} views</div> : ""}
    </div>
  );
};

export default VidCard;
