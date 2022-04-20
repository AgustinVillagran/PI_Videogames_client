import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import "../Styles/VideogameDetail.css";
import axios from "axios";
import Loading from "../Components/Loading";



export default function VideogameDetail(props) {
  const [videogame, setvideogame] = useState();
  const {history: { push }} = props;
  const { id } = useParams();
  useEffect(() => {
    async function getData() {
      //deploy: http://localhost:3333 out
      const videogame = await axios(`/videogame/${id}`);
      setvideogame(videogame.data);
    }
    getData();
  }, [id]);
  function handleNavigate() {
    push("/videogames");
  }

  return videogame 
    ? (
      <div className="backgroundContainerVideogameDetail" style={{backgroundImage:`url(${videogame.background_image})`}}>
      <div className="btnBackContainter">
        <button className="btnBack" type="button" onClick={handleNavigate}>
          Back
        </button>
      </div>
      <div className="ContainerVideogameDetail"  >
        <div className="imgContainerVideogameDetail">
          <img
            src={videogame.background_image}
            alt="imageVideogame"
            className="imgVideogameDetail"
          />
        </div>
        <div className="textContainerVideogameDetail">
          <div className="titlesVideogameDetail">Name</div>
            <p>{videogame.name}</p>
          <div className="titlesVideogameDetail">Description</div>
            <p className="containerDescripcionVideogameDetail">
              {videogame.description}
            </p>
          <div className="titlesVideogameDetail">Platforms</div>
            <p>{`${videogame.platforms?.join(", ")}.`}</p>
          <div className="titlesVideogameDetail">Genres</div>
            <p>{`${videogame.genres?.join(", ")}.`}</p>
          <div className="containerReleasedAndRating">
          <div className="cointainerAttributeVideogame">
            <div className="titlesVideogameDetail">Released</div>
            <p>{videogame.released}</p>
          </div>
          <div className="cointainerAttributeVideogame">
            <div className="titlesVideogameDetail">Rating</div>
            <p>{videogame.rating}</p>
          </div>
          </div>
        </div>
      </div>
      </div>
  ) : <Loading/>;
} //Made with Love :)
