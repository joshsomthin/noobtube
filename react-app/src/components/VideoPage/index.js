import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactPlayer from "react-player";
import { setCurrentVideo } from "../../store/videos";
import SubsribeButton from "../SubscribeButton";
import "./VideoPage.css";

const VideoPage = () => {
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const currentVideo = useSelector((state) => state.videos.current);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(setCurrentVideo(videoId)).then(() => setIsLoaded(true));
  }, [dispatch, videoId]);

  const reactPlayer = (
    <ReactPlayer
      className="react-player"
      width="100%"
      height="100%"
      url={currentVideo?.video_path}
    />
  );

  const defaultPlayer = (
    <video className="react-player video" width="100%" height="100%" controls>
      <source src={currentVideo?.video_path} />
    </video>
  );

  return (
    isLoaded && (
      <div className="grid">
        <div>
          <div className="video-container">
            {currentVideo.video_path.includes(".mp4")
              ? defaultPlayer
              : reactPlayer}
          </div>
          <div className="video-info">
            <div>
              <div>{currentVideo.title}</div>
              <div>{currentVideo.views} views</div>
            </div>
            <div>
              <SubsribeButton channelId={currentVideo.channel_id} />
            </div>
          </div>
        </div>
        <div className="sidebar">Hello</div>
      </div>
    )
  );
};

export default VideoPage;
