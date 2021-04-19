import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addNewVideo } from "../../store/videos";

const VidCard = ({ size, video, key }) => {
  const history = useHistory();
  const [videoId, setVideoId] = useState(1);
  const dispatch = useDispatch();

  const updateVideo = async (e) => {
    if (video?.channel_name) {
      let vidId = await dispatch(addNewVideo(video));
      setVideoId(vidId);
    } else {
    }
    history.push(`/videos/${videoId}`);
  };
  return (
    <div
      key={key}
      onClick={updateVideo}
      className="video-card"
      style={{ width: "360px" }}
    >
      <img
        alt="video card"
        width={"360"}
        height={"200"}
        style={{ objectFit: "cover" }}
        src={video.image_path}
      />
      <div>{video}</div>
      {video?.views !== null ? <div>{video?.views} views</div> : ""}
    </div>
  );
};

export default VidCard;
