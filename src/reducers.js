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
  let newState;
  switch (action.type) {
    case FAV_ADD:
      ToasterStatus = toast.info("Aktivite favorilere eklendi !");
      newState = { ...state, favs: [...state.favs, action.payload] };
      writeFavsToLocalStorage(newState);
      return newState;

    case FAV_REMOVE:
      ToasterStatus = toast.warning("Aktivite favorilerden çıkarıldı :(");
      newState = {
        ...state,
        favs: state.favs.filter((activity) => activity.id !== action.payload),
      };
      writeFavsToLocalStorage(newState);

      return newState;

    case FETCH_LOADING:
      ToasterStatus = toast.loading("Aktivite yükleniyor...");
      return {
        ...state,
        loading: true,
        error: null,
        current: null,
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
      return { ...state, favs: readFavsFromLocalStorage() || [] };

    default:
      return state;
  }
}
