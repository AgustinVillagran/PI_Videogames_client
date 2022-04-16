import app from "./App";
import genres from "./Genres";
import videogames from "./Videogames";
import { combineReducers } from "redux";
import searchVideogames from "./SearchVideogames";

const rootReducer = combineReducers({app, videogames, genres, searchVideogames})

export default rootReducer;