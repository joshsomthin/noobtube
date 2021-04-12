const LOAD_VIDEOS = "videos/LOAD_VIDEOS";
const CURRENT_VIDEO = "videos/CURRENT_VIDEO";
const LOAD_SUBS = "subscriptions/LOAD_SUBS";
const LOAD_CHANNEL = "subscriptions/LOAD_CHANNEL";
const UPDATE_GENRE = "videos/UPDATE_GENRE";

const queryVideos = (videos) => ({
  type: LOAD_VIDEOS,
  videos,
});

const currentVideo = (video) => ({
  type: CURRENT_VIDEO,
  video,
});

const loadSubs = (videos) => ({
  type: LOAD_SUBS,
  videos,
});

const loadChannel = (videos) => ({
  type: LOAD_CHANNEL,
  videos,
});

const updateCurrentGenre = (genreId) => ({
  type: UPDATE_GENRE,
  genreId,
});

export const currentGenre = (genreId) => async (dispatch) => {
  dispatch(updateCurrentGenre);
};

export const increaseView = (videoId) => async (dispatch) => {
  const res = await fetch(`/api/videos/${videoId}/watched`, {
    method: "PUT",
  });
  const data = await res.json();
  if (data.errors) throw data;
  return data;
};

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

export const loadSubscriptions = (userId) => async (dispatch) => {
  const data = await fetch(`/api/videos/${userId}/subscriptions`);
  const res = await data.json();
  console.log(res);
  if (!data.ok) throw data;
  dispatch(loadSubs(res));
  return res;
};

export const loadChannelVideos = (channelId) => async (dispatch) => {
  const res = await fetch(`/api/videos/${channelId}/channel`);
  const data = await res.json();
  if (!res.ok) throw data;
  dispatch(loadChannel(data));
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
    case LOAD_SUBS:
      newState = { ...state };
      newState.videos = action.videos.subscription_videos;
      return newState;
    case LOAD_CHANNEL:
      newState = { ...state };
      newState.videos = action.videos;
      return newState;
    case UPDATE_GENRE:
      newState = { ...state };
      newState.currentGenre = action.genreId;
    default:
      return state;
  }
};
export default videosReducer;
