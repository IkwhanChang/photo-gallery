import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";
import photo from "./photo";

export default combineReducers({
  photo,
  loadingBar: loadingBarReducer
});
