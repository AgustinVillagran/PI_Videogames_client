import '../Styles/Videogame.css';
import NoGameError from './NoGameError';

export default function Videogame(props) {
  const {videogame, navigate} = props;
  const {id, name, background_image, genres, rating} = videogame;

  return(
    videogame?
    <div className="cardVideogameContainer" onClick={()=>navigate(id)}>
      <div className="imgVgContainer">
        <img src={background_image} className="imgVg" alt="VideogameImage"/>
      </div>
      <div className='gamesInfoContainer'>
        <h4 className='gameNameContainer'>{name}</h4>
        <div className='gameGenres'>{`${genres?.join(", ")}.`}</div>
        <div className='gameGenres'>{`${rating} ${"★".repeat(rating)}`}</div>
      </div>
    </div>
    : <NoGameError/>
  )
}; //Made with Love :)

