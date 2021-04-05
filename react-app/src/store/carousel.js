const ADD_CAROUSEL = "videos/ADD_CAROUSEL";
const addCarousel = (id, data) => ({
  type: ADD_CAROUSEL,
  carousel: {
    id,
    data,
  },
});

export const loadCarousels = (id) => async (dispatch) => {
  const res = await fetch(`api/tags/${id}/limit`);
  const data = await res.json();
  if (data.errors) throw data;
  dispatch(addCarousel(id, data));
};

const carouselReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case ADD_CAROUSEL:
      newState = { ...state };
      const id = action.carousel.id;
      newState[id] = action.carousel.data.games;
      return newState;
    default:
      return state;
  }
};

export default carouselReducer;
