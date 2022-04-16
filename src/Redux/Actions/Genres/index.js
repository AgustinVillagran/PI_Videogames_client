import axios from "axios";
import { SET_GENRES } from "../ActionTypes";

function setGenres(payload) {
  return{
    type: SET_GENRES,
    payload,
  };
};

export default function getGenres() {
  //deploy: http://localhost:3333
  const URL_GENRES = "/genres"
  
  return async (dispatch) =>{
    const genres = (await axios(URL_GENRES)).data;
    dispatch(setGenres(genres));
  };
};

export function resetGenres() {
  const ARR_EMPTY = [];

  return (dispatch) =>{
    dispatch(setGenres(ARR_EMPTY))
  }
}

