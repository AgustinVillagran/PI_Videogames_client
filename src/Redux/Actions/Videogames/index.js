import axios from "axios";
import { SET_VIDEOGAMES } from "../ActionTypes";
import { FILTER_BY_GENRE } from "../ActionTypes";
import { FILTER_BY_SOURCE } from "../ActionTypes";
import appLoading from "../App/Index";

function setVideogamesApi(payload){
  return{
    type: SET_VIDEOGAMES,
    payload,
  } 
};

export default function getVideogamesApi (){
  //deploy: http://localhost:3333
  const URL_VIDEOGAMES = "/videogames";
  try {
    return  async (dispatch) => {
        dispatch(appLoading(true))
        const videogames = (await axios(URL_VIDEOGAMES)).data;
        dispatch(setVideogamesApi(videogames));
        dispatch(appLoading(false));
        
      } // eslint-disable-next-line
    } catch (error) {
      console.log("getVideogamesApi/ctionCreator/Reducer Videogames: ", error)
    }
};

export function orderVideogames(payload) {
    return (dispatch) =>dispatch({type:payload})
};

function setFilterVideogamesSource(payload) {
  return{
    type: FILTER_BY_SOURCE,
    payload
  }
}

function setFilterVideogamesGenre(payload) {
  return{
    type: FILTER_BY_GENRE,
    payload
  }
}

export function filterVideogamesSource(payload){
  return (dispatch) => dispatch(setFilterVideogamesSource(payload))
};

export function filterVideogamesGenre(payload){
  return (dispatch) => dispatch(setFilterVideogamesGenre(payload))
};

export function resetVideogames(){
  return(dispatch) =>{
    dispatch(setVideogamesApi([]));
  };
}