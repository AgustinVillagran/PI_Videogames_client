import VideogameCreator from "./Views/VideogameCreator";
import VideogameDetail from "./Views/VideogameDetail";
import { Route } from "react-router-dom";
import Landing from "./Views/Landing";
import Home from "./Views/Home";
import "./Styles/App.css";

function App() {

  return (
    <div className="App">
      <Route path="/" exact component={Landing}/>
      <Route path="/Videogames" exact component={Home}/>
      <Route path="/Create" exact component={VideogameCreator}/>
      <Route path="/Videogame/:id" exact component={VideogameDetail}/>
    </div>
  );
}
export default App; //Made with Love :)
