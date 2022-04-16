import { SET_APP_LOADING } from "../ActionTypes";

function setAppLoading(payload){
  return{
    type: SET_APP_LOADING,
    payload
  }
};

export default function appLoading(payload){
  return (dispatch) => dispatch(setAppLoading(payload))
}