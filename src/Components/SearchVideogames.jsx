import searchVideogamesByName from "../Redux/Actions/SearchVideogames";
import { useDispatch, useSelector } from "react-redux";
import NoGamesError from "../Components/NoGamesError";
import { useEffect, useState } from "react";
import Videogame from "./Videogame";

export default function SearchVideogames({ name, handleNavigate }) {
  const { searchVideogames:{allSearchVideogames} } = useSelector((state) => state);
  let [foundedVgs, setFoundedVgs] = useState();
  const dispatch = useDispatch();

  useEffect(() => {// eslint-disable-next-line
    setFoundedVgs(foundedVgs = [])
    name?.length && dispatch(searchVideogamesByName(name));
  }, [dispatch,name]);
  
  useEffect(()=>{ setFoundedVgs(allSearchVideogames)},[allSearchVideogames])
  
  return (
    <div className="searchVideogameConteiner">
      {foundedVgs?.length && typeof foundedVgs[0] === "string"
      ? <div className="NotFoundSearchVideogames">{foundedVgs[0]}</div>
      :foundedVgs?.length
        ? foundedVgs.map((le) => (
          <Videogame 
            key={le.id} 
            videogame={le} 
            navigate={handleNavigate} 
          />
        ))
        : !foundedVgs?.lengt && <NoGamesError/>
        }</div>
)}
