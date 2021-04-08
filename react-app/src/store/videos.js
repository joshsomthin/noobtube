const LOAD_VIDEOS = "videos/LOAD_VIDEOS";
const CURRENT_VIDEO = "videos/CURRENT_VIDEO";

const queryVideos = (videos) => ({
  type: LOAD_VIDEOS,
  videos,
});

const currentVideo = (video) => ({
  type: CURRENT_VIDEO,
  video,
});

export const loadVideos = (gameId) => async (dispatch) => {
  const res = await fetch(`/api/videos/${gameId}`);
  const data = await res.json();
  if (data.errors) throw data;
  dispatch(queryVideos(data.videos));
  return data;
};

export const setCurrentVideo = (video) => async (dispatch) => {
  dispatch(currentVideo(video));
  return video;
};

const videosReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case LOAD_VIDEOS:
      newState = { ...state };
      newState.videos = action.videos;
      return newState;
    case CURRENT_VIDEO:
      newState = { ...state };
      newState.current = action.video;
      return newState;
    default:
      return state;
  }
};
export default videosReducer;
