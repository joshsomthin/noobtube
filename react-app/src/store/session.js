import { login, logout, signUp } from "../services/auth";
import { setAuthErrors } from "./errors";
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const GET_SUBS = "session/GET_SUBS";

const removeUser = () => ({
  type: REMOVE_USER,
});

const setUser = (user) => ({
  type: SET_USER,
  user,
});

const getSubs = (subs) => ({
  type: GET_SUBS,
  subs,
});

export const getSubscriptions = (userId) => async (dispatch) => {
  const res = await fetch(`api/users/${userId}/subscriptions`);
  const data = res.json();
  if (data.errors) throw data;
  dispatch(data.subscriptions);
  return data;
};

export const signUpUser = (username, email, password) => async (dispatch) => {
  const res = await signUp(username, email, password);
  if (res.errors) return await dispatch(setAuthErrors(res.errors));
  dispatch(setUser(res));
  return res;
};
export const logoutUser = () => async (dispatch) => {
  const res = await logout();
  if (res.errors) throw res.errors;
  dispatch(removeUser());
  return;
};

export const userLogin = (email, password) => async (dispatch) => {
  const res = await login(email, password);
  if (res.errors) throw res.errors;
  dispatch(setUser(res));
  return res;
};

const initialState = {};
const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = { ...state };
      newState.user = action.user;
      return newState;
    case REMOVE_USER:
      newState = { ...state };
      delete newState.user;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
