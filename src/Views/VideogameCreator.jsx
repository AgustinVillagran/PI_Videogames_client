import getVideogamesApi from "../Redux/Actions/Videogames";
import {useDispatch, useSelector} from "react-redux";
import getGenres from "../Redux/Actions/Genres";
import {useEffect, useState} from 'react';
import "../Styles/VideogameCreator.css";
import createVideogame from "../Redux/Actions/Videogame";

export default function VideogameCreator({history:{push}}) {
  const{videogames:{unmutedVgsApi},genres} = useSelector((state) => state);
  let allPlatforms = [];
  unmutedVgsApi?.map(el => {return allPlatforms = allPlatforms.concat(el.platforms)});
  let listPlatforms = [...new Set(allPlatforms)]
  let [data,setData] = useState({
    name:"",
    description:"",
    released: "",
    rating:"",
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
  });
  let [disabled,setDisabled] = useState({
    name: true,
    description: true,
    released: true,
    rating: true,
    platforms: true,
    genres: true,
  });
  const disabledOrNot =  Object.values(disabled).reduce((acc,el) => {
    return acc || el
  });
  const dispatch = useDispatch();
  let [openDialog, setOpenDialog] = useState(false);

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

    const setErr = (err) => {setError(error={
      ...error,[name]:err,disabled:true});
      setDisabled(disabled={...disabled,[name]:true});
      (name==="platforms" || name==="genres") && setOpenDialog(openDialog=true);
    }

    const noErr =  (name) => {setError(error={
      ...error,[name]:""});
      setDisabled(disabled={...disabled,[name]:false});
      (name==="platforms" || name==="genres") && setOpenDialog(openDialog=false)
    };

    switch (name) {
      case "name":
        value.length<4
          ? setErr("The name must be at least 4 characters")
          : value.length>50
            ? setErr("The name must not exceed 50 characters")
            : noErr(name)
        break;
      case "description":
        value.length<50
          ? setErr("The name must be at least 50 characters")
          : value.length>500
            ? setErr("The name must not exceed 500 characters")
            : noErr(name)
        break;
      case "background_image":
        !value
          ? setErr("The image must be complete.")
          : value.slice(0,5) !== "https"
            ? setErr("The link must have https protocol.")
            : value.slice(0,5) === "https" && (value.slice(-3) !== "jpg" && value.slice(-3) !== "png" && value.slice(-3) !== "gif" )
              ? setErr("The image must be jpg, png or gif.")
              : noErr(name)
        break;
      case "released":
        const today = new Date();
        const dayToday = today.getDate();
        const monthToday = today.getMonth()+1;
        const yearToday = today.getFullYear();

        let [yearValue, monthValue, dayValue] = value.split("-");
        yearValue = Number(yearValue);
        monthValue = Number(monthValue);
        dayValue = Number(dayValue);

        yearValue > yearToday
          ? setErr("Date must be earlier than the current date.")
          : yearValue >= yearToday && monthValue > monthToday
            ? setErr("Date must be earlier than the current date.")
              : yearValue >= yearToday && monthValue >= monthToday && dayValue > dayToday
                ? setErr("Date must be earlier than the current date.")
                : noErr(name)
        break;
      case "rating":
        const numValue = Number(value);

        numValue < 0.1 || numValue > 5
          ? setErr("The rating must be a number between 0.1 and 5")
          : noErr(name)
        break;
      /* case "platforms":
        !value
          ? setErr("Select one platform at least")
          : noErr(name)
        break; */
      /* case "genres":
        
        break; */
      default:
        data[name].includes(value)
          ? setErr(`The ${name} must not be repetead.`)
          : noErr(name)
        break;
    }
    name === "platforms" || name === "genres" 
    ? !data[name].includes(value) 
      && setData(data={
        ...data,
        [name]: [...data[name], value]
      })
    :setData(data={
      ...data,
      [name]:value
    });
  };

  const handleOnChangeCheckbox = (e) =>{
    const value = e.target.value;
    const name = e.target.name;

    setData(data={...data,[name]: data[name].filter(el=> el!==value)})
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    data.rating = Number(data.rating);
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

  const onClickDialogPlatforms = (e) =>{
    const name= e.target.id;
    console.log("name: ", name)
    console.log("antes: ", error[name])
    setError(error={...error,[name]:""})
    console.log(error[name])
    setOpenDialog(openDialog=false)
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
            type="number"
            step={0.1}
            min={0}
            max={5}
            placeholder="Rating"
            name="rating" 
            value={data.rating} 
            onChange={handleOnChange} 
            required
          />{error.rating  &&<span className="errorForm">{error.rating}</span>}
          <div className="selectsConteiner">
            <div className="selects" >
              <select
                id="listPlatformsForm"
                name="platforms" 
                value={data.platforms} 
                onChange={handleOnChange} 
                required
              >{listPlatforms?.map((el, i) =>{
                  return <option key={i}>{el}</option>
                })}
              </select>
              {error.platforms  &&<span className="errorForm">{error.platforms}</span>}
              {data.platforms.map((el, i) =>{
                  return <label className="FormSelects">
                    <input 
                    key={i}
                      type="checkbox" 
                      checked 
                      name="platforms" 
                      value={data.platforms[i]}
                      onChange={handleOnChangeCheckbox} 
                    />{el}
                  </label>
              })}
            </div>
            <dialog 
              open={openDialog}
              className={openDialog && "dialogPlatforms"}
            >
              <span>{error.platforms}</span>
              <span 
                className="xBtnDialog"
                id="platforms"
                onClick={onClickDialogPlatforms}
              >X</span>
            </dialog>
            <div className="selects">
              <select
                id="listGenresForm"
                name="genres" 
                value={data.genres} 
                onChange={handleOnChange} 
                required
              >{genres?.map((el, i) =>{
                  return <option key={i}>{el}</option>
                })}
              </select>
              {data.genres.map((el, i) =>{
                  return <label className="FormSelects">
                    <input 
                    key={i}
                      type="checkbox" 
                      checked 
                      value={data.genres[i]}
                      onChange={handleOnChangeCheckbox} 
                    />{el}
                  </label>
              })}
              {error.genres  &&<span className="errorForm">{error.genres}</span>}
            </div>
          </div>
          <input 
            className={disabledOrNot? "btnFormDisabled" : "btnForm"} 
            type="submit" 
            value="submit"
            disabled={disabledOrNot}
          />
        </form>
      </div>
    </div>
  );
} //Made with Love :)
