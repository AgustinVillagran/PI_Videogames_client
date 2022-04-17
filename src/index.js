import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./Redux/store.js";
import reportWebVitals from "./Tests/reportWebVitals";
import App from "./App";
import "./Styles/index.css";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const {DB_URL} = process.env;

axios.defaults.baseURL = process.env.NODE_ENV === "production" ? process.env.REACT_APP_API : process.env.DB_URL ;
console.log("axios.defaults.baseURL: ", axios.defaults.baseURL, "process.env.DB_URL : ", process.env.DB_URL, "process.env.REACT_APP_API: ", process.env.REACT_APP_API, "DB_URL: ", DB_URL,"axios.defaults: ", axios.defaults, "process.env: ", process.env)
//hola
render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); //Made with Love :)
