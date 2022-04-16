import axios from "axios";
import { SEARCH_VIDEOGAMES } from "../ActionTypes";
import appLoading from "../App/Index";

function setSearchVideogamesByName(payload) {
  return{
    type: SEARCH_VIDEOGAMES,
    payload,
  }
};

export default function searchVideogamesByName(name) {
  //deploy: http://localhost:3333
  const URL_SEARCH_BY_NAME = `/videogames?name=${name}`
  try {
    return async (dispatch) => {
      dispatch(appLoading(true))
      const foundedVideogames = (await axios(URL_SEARCH_BY_NAME)).data;
      dispatch(setSearchVideogamesByName(foundedVideogames));
      dispatch(appLoading(false))
    } // eslint-disable-next-line
  } catch (err) {
    console.log("error en searchVideogamesByName: ", err);
  }
  
  ;
};
