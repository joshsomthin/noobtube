const LOAD_GENRES = "videos/LOAD_GENRES";

const addGenres = (genres) => ({
  type: LOAD_GENRES,
  genres,
});

export const loadGenres = () => async (dispatch) => {
  const res = await fetch("/api/tags/");
  const data = await res.json();
  if (data.errors) throw data;
  dispatch(addGenres(data));
  return data;
};

const genresReducer = (state = {}, action) => {
  let newState;
  let obj = {};
  switch (action.type) {
    case LOAD_GENRES:
      newState = { ...state };
      obj = {};
      action.genres.tags.forEach((genre) => {
        return (obj[genre.id] = genre);
      });
      newState = obj;
      return newState;
    default:
      return state;
  }
};

export default genresReducer;
