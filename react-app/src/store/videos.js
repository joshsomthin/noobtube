const LOAD_VIDEOS = "videos/LOAD_VIDEOS";
const CURRENT_VIDEO = "videos/CURRENT_VIDEO";
const LOAD_SUBS = "subscriptions/LOAD_SUBS";
const LOAD_CHANNEL = "subscriptions/LOAD_CHANNEL";
const UPDATE_GENRE = "videos/UPDATE_GENRE";
const SEARCH_GAMES = "videos/SEARCH_GAMES";
const UPDATE_COMMENTS = "videos/UPDATE_COMMENTS";

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

const searchVideos = (videos) => ({
  type: SEARCH_GAMES,
  videos,
});

const updateComments = (comments) => ({
  type: UPDATE_COMMENTS,
  comments,
});

export const getComments = (videoId) => async (dispatch) => {
  const res = await fetch(`api/videos/${videoId}/comment`);
  const data = await res.json();
  if (data.errors) throw data;
  dispatch(updateComments(data.comments));
};

export const submitComment = (videoId, userId, comment) => async (dispatch) => {
  const res = await fetch(`api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ video_id: videoId, user_id: userId, body: comment }),
  });
  const data = await res.json();
  if (data.errors) throw data;
  dispatch(getComments(videoId));
};

export const searchVideoGames = (search) => async (dispatch) => {
  const res = await fetch(`/api/videos/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(search),
  });

  const data = await res.json();
  if (data.errors) throw data;
  dispatch(searchVideos(data.results));
  return data;
};

export const addNewVideo = (video) => async (dispatch) => {
  const res = await fetch(`/api/videos/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(video),
  });
  const data = await res.json();
  if (data.errors) throw data;
  dispatch(currentVideo(data.video));
  return data;
};

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
      return newState;
    case SEARCH_GAMES:
      newState = { ...state };
      newState.search = action.videos;
      return newState;
    case UPDATE_COMMENTS:
      newState = { ...state };
      newState.comments = action.comments;
      return newState;
    default:
      return state;
  }
};
export default videosReducer;
