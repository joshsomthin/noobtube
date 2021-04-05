const LOAD_GENRES = "videos/LOAD_GENRES";
const LOAD_VIDEOS = "videos/LOAD_VIDEOS";

const addGenres = (genres) => ({
  type: LOAD_GENRES,
  genres,
});

const queryVideos = (videos) => ({
  type: LOAD_VIDEOS,
  videos,
});

export const loadVidoes = (gameId) => async (dispatch) => {
  const res = await fetch(`/api/videos/${gameId}`);
  const data = await res.json();
  if (data.errors) throw data;
  dispatch(queryVideos(data.videos));
  return data;
};

export const loadGenres = () => async (dispatch) => {
  const res = await fetch("/api/tags");
  const data = await res.json();
  if (data.errors) throw data;
  dispatch(addGenres(data));
  return data;
};

const videosReducer = (state = {}, action) => {
  let newState;
  let obj = {};
  switch (action.type) {
    case LOAD_GENRES:
      newState = { ...state };
      obj = {};
      action.genres.tags.forEach((genre) => {
        return (obj[genre.id] = genre);
      });
      newState.genres = obj;
      return newState;

    case LOAD_VIDEOS:
      newState = { ...state };
      newState.videos = action.videos;
      return newState;
    default:
      return state;
  }
};
export default videosReducer;
