import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
} from "./actions";

import { toast } from "react-toastify";

let ToasterStatus = null;

const initial = {
  favs: [],
  current: null,
  error: null,
  loading: true,
};

function writeFavsToLocalStorage(state) {
  localStorage.setItem("s10g4", JSON.stringify(state.favs));
}

function readFavsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("s10g4"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      return { ...state, favs: [...state.favs, action.payload] };

    case FAV_REMOVE:
      return {
        ...state,
        favs: state.favs.filter((item) => item !== action.payload),
      };

    case FETCH_LOADING:
      ToasterStatus = toast.loading("Aktivite yükleniyor...");
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_SUCCESS:
      toast.update(ToasterStatus, {
        render: "Yüklendi!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      return { ...state, current: action.payload, loading: false };

    case FETCH_ERROR:
      toast.update(ToasterStatus, {
        render: `Yüklenemedi! :(  ${action.payload}`,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      return { state, error: action.payload, loading: false };

    case GET_FAVS_FROM_LS:
      return state;

    default:
      return state;
  }
}
