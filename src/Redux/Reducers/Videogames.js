import { ORDER_DESC_RATING } from "../Actions/ActionTypes";
import { FILTER_BY_SOURCE } from "../Actions/ActionTypes";
import { ORDER_ASC_RATING } from "../Actions/ActionTypes";
import { FILTER_BY_GENRE } from "../Actions/ActionTypes";
import { ORDER_DESC_NAME } from "../Actions/ActionTypes";
import { ORDER_ASC_NAME } from "../Actions/ActionTypes";
import { SET_VIDEOGAMES } from "../Actions/ActionTypes";

const initialState = {
  videogamesApi: [],
  unmutedVgsApi: []
};

export default function videogames(state = initialState, {type, payload}) {
  switch (type) {
    case SET_VIDEOGAMES:
      return{ unmutedVgsApi: payload,
        videogamesApi: payload
      };
      
      case ORDER_DESC_NAME:
        return {
          videogamesApi: state.videogamesApi.sort((a ,b)=> a.name.localeCompare(b.name)),
          unmutedVgsApi: state.unmutedVgsApi
          
        }

      case ORDER_ASC_NAME:
        return {
          videogamesApi: state.videogamesApi.sort((a ,b)=> b.name.localeCompare(a.name)),
          unmutedVgsApi: state.unmutedVgsApi
        }
        
      case ORDER_ASC_RATING:
        return {
          videogamesApi: state.videogamesApi.sort((a, b) => a.rating < b.rating? -1 : 1),
          unmutedVgsApi: state.unmutedVgsApi
        }
  
      case ORDER_DESC_RATING:
        return {
          videogamesApi: state.videogamesApi.sort((a, b) => a.rating > b.rating? -1 : 1),
          unmutedVgsApi: state.unmutedVgsApi
        }

      case FILTER_BY_GENRE:
        return {
          videogamesApi: state.unmutedVgsApi.filter((el) => el.genres.includes(payload)),
          unmutedVgsApi: state.unmutedVgsApi
        }

      case FILTER_BY_SOURCE:
        return {
          videogamesApi: payload === "by You" 
          ? state.unmutedVgsApi.filter((el) => (el.id+"").includes("-"))
          : state.unmutedVgsApi.filter((el) => !(el.id+"").includes("-")),
          unmutedVgsApi: state.unmutedVgsApi
        }

    default:
      return {...state};
  };
};
