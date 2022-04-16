import getGenres from "../Redux/Actions/Genres/index";
import { filterVideogamesGenre, filterVideogamesSource } from "../Redux/Actions/Videogames";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "../Styles/Filter.css";

export default function Filter(props) {
  let {
    handleOnChangeFilterSource,
    source,
    handleOnChangeFilterGenre,
    genre} = props;
  const dispatch = useDispatch();
  const {genres} = useSelector((state) => state);

    useEffect(() => {
      dispatch(getGenres());
    }, [dispatch]);

    useEffect(() => {
      (genre !== "Filter by Genre") && dispatch(filterVideogamesGenre(genre))
    }, [dispatch, genre]);

    useEffect(() => {
      (source !== "Filter by Source") && dispatch(filterVideogamesSource(source))
    }, [dispatch, source]); 
    
  return (
    <div className="FilterContainer">
      <div className="selectFilterContainer">
        <select className="filterSourceContainer" 
          value={source} onChange={handleOnChangeFilterSource}
        >
          <option disabled hidden >Filter by Source</option>
          <option>by You</option>
          <option>by GAMEFLIX</option>
        </select>
      </div>
      <div className="selectFilterContainer">
        <select className="filterGenreContainer"
          value={genre} onChange={handleOnChangeFilterGenre}
        >
          <option disabled hidden >Filter by Genre</option>
            {genres?.map((el,i) =>{
              return (<option key={i}>{el}</option>)
            })}
        </select>
      </div>
    </div>
  );
} //Made with Love :)


