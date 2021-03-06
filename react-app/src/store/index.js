import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import errorsReducer from "./errors";
import videosReducer from "./videos";
import carouselReducer from "./carousel";
import genresReducer from "./genres";
import modalReducer from "./modal";

const rootReducer = combineReducers({
  user: sessionReducer,
  errors: errorsReducer,
  videos: videosReducer,
  carousels: carouselReducer,
  genres: genresReducer,
  modal: modalReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
