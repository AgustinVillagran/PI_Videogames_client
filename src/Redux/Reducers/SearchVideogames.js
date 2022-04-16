import { SEARCH_VIDEOGAMES } from "../Actions/ActionTypes";
import { ORDER_ASC_NAME } from "../Actions/ActionTypes";
import { ORDER_DESC_NAME } from "../Actions/ActionTypes";
import { ORDER_ASC_RATING } from "../Actions/ActionTypes";
import { ORDER_DESC_RATING } from "../Actions/ActionTypes";
import { FILTER_BY_SOURCE } from "../Actions/ActionTypes";
import { FILTER_BY_GENRE } from "../Actions/ActionTypes";

const initialState = {
  allSearchVideogames:[],
  mutedSearchVideogames: []
};

export default function searchVideogames(state = initialState,{type, payload}) {
  switch (type) {
    case SEARCH_VIDEOGAMES: 
      return {
        allSearchVideogames: payload,
        mutedSearchVideogames: payload
      };
      case ORDER_DESC_NAME:
        return {
          allSearchVideogames: state.mutedSearchVideogames.sort((a ,b)=> a.name.localeCompare(b.name)),
          mutedSearchVideogames: state.mutedSearchVideogames
        };

      case ORDER_ASC_NAME:
        return {
          allSearchVideogames: state.mutedSearchVideogames.sort((a ,b)=> b.name.localeCompare(a.name)),
          mutedSearchVideogames: state.mutedSearchVideogames
        };
        
      case ORDER_ASC_RATING:
        return {
          allSearchVideogames: state.mutedSearchVideogames.sort((a, b) => a.rating < b.rating? -1 : 1),
          mutedSearchVideogames: state.mutedSearchVideogames
        };
  
      case ORDER_DESC_RATING:
        return {
          allSearchVideogames: state.mutedSearchVideogames.sort((a, b) => a.rating > b.rating? -1 : 1),
          mutedSearchVideogames: state.mutedSearchVideogames
        }
        
      case FILTER_BY_GENRE:
        return {
          allSearchVideogames: state.mutedSearchVideogames.filter((el) => el.genres.includes(payload)),
          mutedSearchVideogames: state.mutedSearchVideogames
        };

      case FILTER_BY_SOURCE:
        return {
          allSearchVideogames: payload === "by You" 
          ? state.mutedSearchVideogames.filter((el) => (el.id+"").includes("-"))
          : state.mutedSearchVideogames.filter((el) => !(el.id+"").includes("-")),
          mutedSearchVideogames: state.mutedSearchVideogames
        };

    default:
      return {...state};
  }
};
