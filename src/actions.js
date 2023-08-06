import axios from "axios";

export const GET_FAVS_FROM_LS = "GET_FAVS_FROM_LS";
export const FAV_ADD = "FAV_ADD";
export const FAV_REMOVE = "FAV_REMOVE";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_LOADING = "FETCH_LOADING";
export const FETCH_ERROR = "FETCH_ERROR";
export const GET_ACTIVITY = "GET_ACTIVITY";

export const getFavsFromLocalStorage = () => {
  return { type: GET_FAVS_FROM_LS };
};

export const addFav = (info) => {
  return { type: FAV_ADD, payload: info };
};

export const removeFav = (item) => {
  return { type: FAV_REMOVE, payload: item.activity };
};

export const fetchAnother = () => (dispatch) => {
  dispatch({ type: FETCH_LOADING, payload: true });

  return axios
    .get("https://www.boredapi.com/api/activity")
    .then((response) =>
      dispatch({ type: FETCH_SUCCESS, payload: response.data })
    )
    .catch((error) => dispatch({ type: FETCH_ERROR, payload: error.message }));
};
