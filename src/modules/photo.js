import axios from "axios";
import { Map, List, merge } from "immutable";
import { createActions, handleActions } from "redux-actions";
import { showLoading, hideLoading } from "react-redux-loading-bar";

const GET_PHOTOS_PENDING = "GET_PHOTOS_PENDING";
const GET_PHOTOS_SUCCESS = "GET_PHOTOS_SUCCESS";
const GET_PHOTOS_FAILURE = "GET_PHOTOS_FAILURE";

export const getPhotos = (count, callback = () => {}) => dispatch => {
  dispatch({ type: GET_PHOTOS_PENDING });
  let promises = [];

  for(let i = 0 ; i < count ; i++){
    let promise = new Promise((resolve, reject) => {
      axios
      .get("https://picsum.photos/800/400/?random", {
        responseType: 'blob'
      })
      .then(response => {
        const reader = new window.FileReader();
        reader.readAsDataURL(response.data);
        reader.onload = function() {

            const imageDataUrl = reader.result;
            const caption = `Caption: ${i+1} Image`;
            resolve({
              url: imageDataUrl,
              caption
            });

        }


      })
      .catch(error => reject(error));
    });

    promises.push(promise);
  }

  Promise.all(promises).then((photos) => {
    dispatch({
      type: GET_PHOTOS_SUCCESS,
      payload: {
        photos
      }
    });

    callback();
  })
};

//Reducer

const initialState = Map({
  photos: List()
});

export default handleActions(
  {
    /* GET_PHOTOS */
    [GET_PHOTOS_PENDING]: (state, action) =>
      state
        .set("isPending", true)
        .set("isError", false),
    [GET_PHOTOS_SUCCESS]: (state, { payload: { photos } }) =>
      state
        .set("photos", photos)
        .set("isError", false)
        .set("isPending", false),
    [GET_PHOTOS_FAILURE]: (state, { payload: { error, errorMessage } }) =>
      state
        .set("isError", true)
        .set("isPending", false)
  },
  initialState
);
