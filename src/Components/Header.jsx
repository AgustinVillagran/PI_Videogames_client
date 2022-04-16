import "../Styles/Header.css";
import Filter from "./Filter";
import Order from "./Order";

export default function Header(props) {
  const {
    handleOnChangeFilterSource,
    handleOnChangeFilterGenre,
    handleonChangeFinder,
    handleOnChangeOrder,
    handleOnChangePage,
    source,
    finder,
    order,
    genre,
    push,
    page,
    maxPage} = props;


  const handleOnClickLogo = () => {
    push(`/`);
  };

  const handleOnClickBtnCreate = () => {
    push(`/Create`);
  };
  

  return(
    <div className="Header">
        <div className="logoHeaderHomeContainer" onClick={handleOnClickLogo}>
          GAMEFLIX
        </div>
        <div className="btnCreateGameHeaderContainer">
          <button onClick={handleOnClickBtnCreate}
          className="btnCreateGameHeader">CREATE YOUR GAME</button>
        </div>
        <div className="sortByHeaderContainer">
          <Order 
            handleOnChangeOrder={handleOnChangeOrder} 
            order={order}/>
        </div>
        <div className="pageHeaderPageContainer">
          <input className="sliderByHeaderContainer"
            type="range"
            min="1"
            max={maxPage} 
            value={page}
            onInput={(e) => handleOnChangePage(e.target.value)}
          />
        </div>
        <div className="filterByHeaderContainer">
          <Filter 
            handleOnChangeFilterSource={handleOnChangeFilterSource} 
            handleOnChangeFilterGenre={handleOnChangeFilterGenre}
            source={source}
            genre={genre}
          />
        </div>
        <div className="inputHeaderHomeContainer">
          <input
            className="inputHeaderHome"
            type="search"
            name="finder"
            value={finder}
            placeholder="Search by Name"
            // onClick={(e) => handleonChangeFinder(e.target.value)}
            onChange={(e) => handleonChangeFinder(e.target.value)}
          />
        </div>
      </div>
  );
}; //Made with Love :)
