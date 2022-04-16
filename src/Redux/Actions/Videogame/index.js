import axios from "axios";

export default function createVideogame(payload) {
  //deploy: http://localhost:3333
  const URL_POST = "/videogame"
  return async() => {
    const response = (await axios.post(URL_POST,payload)).data;
    console.log("response: ", response)
    return response;
  }
};