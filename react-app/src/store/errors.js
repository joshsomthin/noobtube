const AUTH_ERRORS = "errors/AUTH_ERRORS";

const authErrors = (errors) => ({
  type: AUTH_ERRORS,
  errors,
});

export const setAuthErrors = (errors) => (dispatch) => {
  const res = dispatch(authErrors(errors));
  return res;
};

const initialState = {};
const errorsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case AUTH_ERRORS:
      newState = { ...state };
      newState.auth = action.errors;
      return newState;
    default:
      return state;
  }
};

export default errorsReducer;
