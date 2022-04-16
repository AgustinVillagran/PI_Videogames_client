import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "../Styles/Landing.css";

export default function Landing() {
  return(
    <div className="landingContainer">
      <div className="textContainer">
        <Link className="linkReact" to="/Videogames">
          <h1 className="GameflixConteiner">GAMEFLIX</h1>
          {/* <button type="button" className="btnLanding">Start</button> */}
        </Link>
      </div>
        <p className="byLanding">by Agustín Villagrán</p>
    </div>
  )
} //Made with Love :)
