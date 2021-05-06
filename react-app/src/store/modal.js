const SHOW_LOGIN_MODAL = "modal/SHOW_LOGIN_MODAL";
const HIDE_LOGIN_MODAL = "modal/HIDE_LOGIN_MODAL";
const SHOW_SIGNUP_MODAL = "modal/SHOW_SIGNUP_MODAL";
const HIDE_SIGNUP_MODAL = "modal/HIDE_SIGNUP_MODAL";

const hideSignUp = () => ({
  type: HIDE_SIGNUP_MODAL,
});

const showSignUp = () => ({
  type: SHOW_SIGNUP_MODAL,
});

const hideLogin = () => ({
  type: HIDE_LOGIN_MODAL,
});

const showLogin = () => ({
  type: SHOW_LOGIN_MODAL,
});

export const manageLoginModal = (boolean = false) => {
  if (!boolean) {
    return hideLogin();
  } else {
    return showLogin();
  }
};

export const manageSignupModal = (boolean = false) => {
  if (!boolean) {
    return hideSignUp();
  } else {
    return showSignUp();
  }
};

const initialState = { status: { login: false, signup: false } };
const modalReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SHOW_LOGIN_MODAL:
      newState = { ...state };
      newState.status.login = true;
      return newState;
    case HIDE_LOGIN_MODAL:
      newState = { ...state };
      newState.status.login = false;
      return newState;
    case SHOW_SIGNUP_MODAL:
      newState = { ...state };
      newState.status.signup = true;
      return newState;
    case HIDE_SIGNUP_MODAL:
      newState = { ...state };
      newState.status.signup = false;
      return newState;
    default:
      return state;
  }
};

export default modalReducer;
