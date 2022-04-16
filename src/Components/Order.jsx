import { orderVideogames } from "../Redux/Actions/Videogames";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import "../Styles/Order.css";

export default function Order({handleOnChangeOrder, order}) {
  const dispatch = useDispatch();

  useEffect(() => {
    order!=="Order by" && dispatch(orderVideogames(order))}
  , [dispatch,order]);
  
  return (
    <div className="selectOrderContainer">
      <select  className="orderByHeaderContainer" value={order} onChange={handleOnChangeOrder}>
        <option disabled hidden>Order by</option>
        <option>↓ Name</option>
        <option>↑ Name</option>
        <option>↓ Rating</option>
        <option>↑ Rating</option>
      </select>
  </div>
  );
}


