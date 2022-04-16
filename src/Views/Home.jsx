import getVideogamesApi from "../Redux/Actions/Videogames";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import SearchVideogames from "../Components/SearchVideogames";
import NoGamesError from "../Components/NoGamesError";
import Videogame from "../Components/Videogame";
import Loading from "../Components/Loading";
import Header from "../Components/Header";
import "../Styles/Home.css";

// eslint-disable-next-line
//const cleanStr = /[\s`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/g;

export default function Home(props) {
  let [source, setSource] = useState("Filter by Source");
  let [genre, setGenre] = useState("Filter by Genre");
  let [order, setOrder] = useState("Order by");
  let [maxPage, setMaxPage] = useState(1);
  let [finder, setFinder] = useState("");
  let [page, setPage] = useState(1);
  const {history: { push }} = props;
  let [vgs, setVgs] = useState([]);
  const dispatch = useDispatch();
  const { 
    searchVideogames:{allSearchVideogames},
    videogames:{videogamesApi},
    app:{loading}
  } = useSelector((state) => state);


  useEffect(() => {dispatch(getVideogamesApi())}, [dispatch]);

  useEffect(() => {
    let initState = videogamesApi?.length
      ? videogamesApi.slice((page*15)-15, page*15)
      : [];// eslint-disable-next-line
      setVgs(vgs=initState);
    }, [videogamesApi, videogamesApi[0],allSearchVideogames]);

  useEffect(() =>{
    let maxPageCalc
    finder
    ? maxPageCalc = Math.ceil(allSearchVideogames?.length/15)
    : maxPageCalc = Math.ceil(videogamesApi?.length/15);
    // eslint-disable-next-line
    setMaxPage(maxPage = maxPageCalc)
    // eslint-disable-next-line
    setPage(page=1)
  },[videogamesApi, allSearchVideogames, finder]) 


  const handleNavigate = (id) => {
    push(`/videogame/${id}`);
    setVgs(vgs=[]);
    setFinder(finder="")
  };
  
  const handleOnChangePage = (numPage) => {
    setPage(page=numPage)
    const n = page * 15;
    const m = n - 15;
    const videogamesFromStore = videogamesApi?.slice(m, n);

    setVgs(videogamesFromStore);
  };

  const handleOnChangeFinder = (value) => {
    setFinder(finder=value);
    setSource(source="Filter by Source");
    setGenre(genre="Filter by Genre");
    setOrder(order="Order by");
    setPage(page=1)
  };

  const handleOnChangeOrder = (e) => {
    setOrder(order=e.target.value);
    //setSource(source="Filter by Source");
    //setGenre(genre="Filter by Genre");
    setPage(page=1)
  };

  const handleOnChangeFilterGenre = (e) => {
    setGenre(genre=e.target.value);
    setOrder(order="Order by");
    setSource(source="Filter by Source");
    setPage(page=1)
  };
  const handleOnChangeFilterSource = (e) => {
    setSource(source=e.target.value);
    setGenre(genre="Filter by Genre");
    setOrder(order="Order by");
    setPage(page=1)
  };
  
  return (
    <div className="homeContentConteiner">
      <Header handleOnChangeFilterGenre={handleOnChangeFilterGenre}
        handleOnChangeFilterSource={handleOnChangeFilterSource}
        handleonChangeFinder={handleOnChangeFinder}
        handleOnChangeOrder={handleOnChangeOrder}
        handleOnChangePage={handleOnChangePage}
        handleNavigate={handleNavigate}
        maxPage={maxPage}
        source={source}
        finder={finder}
        genre={genre}
        order={order}
        page={page}
        push={push} 
      />
      <div className="homeContent">
        {(!vgs?.length && loading) && <Loading />}
          {finder
          ? <SearchVideogames 
            name={finder} 
            handleNavigate={handleNavigate}
          />
          : vgs?.length
          ?(
              vgs.map((videogame) => {
                return (
                  <Videogame
                    key={videogame.id}
                    videogame={videogame}
                    navigate={handleNavigate}
                  />
                );
              })
            )
            : (!loading && vgs) &&  <NoGamesError/>
        }
      </div>
    </div>
  );
} //Made with Love :)
