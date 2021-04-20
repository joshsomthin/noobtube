import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCurrentVideo, addNewVideo } from "../../store/videos";

const VidCard = ({ game, image_path, views = null, video = null }) => {
  const history = useHistory();
  const currentVideo = useSelector((state) => state.videos.current);
  const dispatch = useDispatch();
  const updateVideo = async (e) => {
    if (video?.channel_name) {
      dispatch(addNewVideo(video)).then((res) =>
        history.push(`/videos/${res.video.id}`)
      );
      return await dispatch(setCurrentVideo(video));
    }
    if (video) {
      await dispatch(setCurrentVideo(video));
      return history.push(`/videos/${currentVideo?.id}`);
    }
  };
  return (
    <div onClick={updateVideo} className="video-card" style={{ width: "100%" }}>
      <img
        alt="video card"
        style={{ objectFit: "cover", width: "100%" }}
        src={image_path}
      />
      <div>{game} hi</div>
      {views !== null ? <div>{views} views</div> : ""}
    </div>
  );
};

export default VidCard;
