import getVideogamesApi from "../Redux/Actions/Videogames";
import {useDispatch, useSelector} from "react-redux";
import getGenres from "../Redux/Actions/Genres";
import {useEffect, useState} from 'react';
import "../Styles/VideogameCreator.css";
import createVideogame from "../Redux/Actions/Videogame";

export default function VideogameCreator({history:{push}}) {
  const{videogames:{unmutedVgsApi},genres} = useSelector((state) => state);
  let allPlatforms = [];
  unmutedVgsApi?.map(el => {allPlatforms = allPlatforms.concat(el.platforms)});
  let listPlatforms = [...new Set(allPlatforms)]
  let [data,setData] = useState({
    name:"",
    description:"",
    released: "",
    rating:1,
    platforms: [],
    genres: [],
    background_image:"",
  });
  let [error,setError] = useState({
    name:"",
    description:"",
    released: "",
    rating:"",
    platforms: "",
    genres: "",
    disabled: true,
  });
  const dispatch = useDispatch();
  useEffect(() =>{
    dispatch(getGenres())
    dispatch(getVideogamesApi())
  },[dispatch])
  

  const handleOnClickBack = () =>{
    push(`/videogames`);
  }

  const handleOnChange = (e) =>{
    const value = e.target.value;
    const name = e.target.name;

    switch (name) {
      case "name":
        value.length<4
          ? setError(error={...error,[name]:"The name must be at least 4 characters",disabled:true})
          : value.length>50
            ? setError(error={...error,[name]:"The name must not exceed 50 characters",disabled:true})
            : setError(error={...error,[name]:"",disabled:false})
        break;
      case "description":
        value.length<50
          ? setError(error={...error,[name]:"The name must be at least 50 characters",disabled:true})
          : value.length>500
            ? setError(error={...error,[name]:"The name must not exceed 500 characters",disabled:true})
            : setError(error={...error,[name]:"",disabled:false})
        break;
      case "released":
        // !/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/.test(data.released)
        // && setError(error={...error,[name]:"The released must be a date with the format dd/mm/yyyy",disabled:true})
        break;
      case "rating":
        (![name] || [name]<0 || [name]>5) 
        && setError(error={...error,[name]:"The rating must be a number between 0 and 5",disabled:true})
        break;
      case "platforms":
        ![name] && setError(error={...error,[name]:"Select one platform at least",disabled:true})
        break;
      case "genres":
        ![name] && setError(error={...error,[name]:"Select one genre at least",disabled:true})
        break;
      default:
        break;
    }
    name === "platforms" || name === "genres" 
    ? !(data[name].includes(value))
      && setData(data={
      ...data,
      [name]: [...data[name], value]
      })
    :setData(data={
      ...data,
      [name]:value
    })
  }/* setError(error={...error, [name]: `The ${name} must not repeat`} */

  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log("data: ", data)
    const newVideogame = await dispatch(createVideogame(data));
    setData(data={
      name:"",
      description:"",
      released: "",
      rating:1,
      platforms: [],
      genres: [],
      background_image:"",
    })
    alert("Your videogames is ALIVE! :)")
    push(`/videogame/${newVideogame.id}`)
  }

  return(
    <div className="videogameCreatorContainer">
      <div className="btnbackContainer">
        <button className="btnBackFormCreator"onClick={handleOnClickBack}>Back</button>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h4 className="titleForm"> CREATE YOUR OWN GAME </h4>
          <input 
            type="text" 
            name="name" 
            value={data.name} 
            onChange={handleOnChange}  
            placeholder="Name"
            required
          />{error.name  &&<span className="errorForm">{error.name}</span>}
          <input 
            type="text" 
            name="description" 
            className="descriptionForm"
            value={data.description} 
            onChange={handleOnChange}  
            placeholder="Description"
            required
          />{error.description  &&<span className="errorForm">{error.description}</span>}
          <input 
            type="url" 
            name="background_image" 
            className="background_imageForm"
            value={data.background_image} 
            onChange={handleOnChange}  
            placeholder="Image"
            required
          />{error.background_image  &&<span className="errorForm">{error.background_image}</span>}
          <input 
            type="date" 
            name="released" 
            value={data.released} 
            onChange={handleOnChange} 
            placeholder="Released"
            required
          />{error.released  &&<span className="errorForm">{error.released}</span>}
          <input 
            type="number" //me jode con los decimales 
            min={0}
            max={5}
            name="rating" 
            value={data.rating} 
            onChange={handleOnChange} 
            placeholder="Rating"
            required
          />{error.rating  &&<span className="errorForm">{error.rating}</span>}
          <select
            multiple
            id="listPlatformsForm"
            name="platforms" 
            value={data.platforms} 
            onChange={handleOnChange} 
            required
          >{error.platforms  &&<span className="errorForm">{error.platforms}</span>}
            {listPlatforms?.map((el, i) =>{
              return <option key={i}>{el}</option>
            })}
          </select>
          <select 
            multiple
            id="listGenresForm"
            name="genres" 
            value={data.genres} 
            onChange={handleOnChange} 
            required
          >{error.genres  &&<span>{error.genres}</span>}
            {genres?.map((el, i) =>{
              return <option key={i}>{el}</option>
            })}
          </select>
          <input 
            className={error.disabled?"btnFormDisabled":"btnForm"} 
            type="submit" 
            value="submit"
            disabled={error.disabled}
          />
        </form>
      </div>
    </div>
  );
} //Made with Love :)
