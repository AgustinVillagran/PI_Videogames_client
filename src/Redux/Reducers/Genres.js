import { SET_GENRES } from "../Actions/ActionTypes";

const initialState= [];

export default function genres(state = initialState,{type, payload}) {
  switch (type) {
    case SET_GENRES:
      return payload;
  
    default:
      return [...state]
  };
};
