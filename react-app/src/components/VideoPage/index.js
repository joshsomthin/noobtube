import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseView } from "../../store/videos";
import CommentForm from "../CommentForm";
import ReactPlayer from "react-player";
import SubsribeButton from "../SubscribeButton";
import VidCard from "../VidCard";
import "./VideoPage.css";

const VideoPage = () => {
  const dispatch = useDispatch();
  const currentVideo = useSelector((state) => state.videos.current);
  const sidebarVideos = useSelector((state) => state.videos.videos);
  const [isLoaded, setIsLoaded] = useState(false);

  const addView = () => {
    dispatch(increaseView(currentVideo.id));
  };

  useEffect(() => {
    if (currentVideo) setIsLoaded(true);
  }, [currentVideo]);

  const reactPlayer = (
    <ReactPlayer
      className="react-player"
      controls={true}
      width="100%"
      height="100%"
      onEnded={addView}
      url={currentVideo?.video_path}
    />
  );

  const defaultPlayer = (
    <video
      onEnded={addView}
      className="react-player video"
      width="100%"
      height="100%"
      controls
    >
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
          <div>
            <div className="video-info">
              <div>
                <div>{currentVideo.title}</div>
                <div>
                  <span>{currentVideo.views} views</span>
                  <span> {currentVideo.created_at}</span>
                </div>
              </div>
              <div>
                <SubsribeButton channelId={currentVideo.channel_id} />
              </div>
            </div>
            {currentVideo.description ? (
              <div>{currentVideo.description}</div>
            ) : (
              <div>Description</div>
            )}
          </div>
          <div className="comment-section">
            <CommentForm />
          </div>
        </div>
        <div className="sidebar">
          <h2>Related Videos</h2>
          {sidebarVideos
            .filter((video) => video.yt_video_id !== currentVideo.yt_video_id)
            .map((video, idx) => {
              return (
                <VidCard
                  key={idx}
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

export default VideoPage;
