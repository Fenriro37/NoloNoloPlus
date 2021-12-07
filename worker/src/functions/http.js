import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8081/",
  //baseURL: "http://site202131.tw.cs.unibo.it",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "dataType":'jsonp',
    // "withCredentials": "true",
    "credentials": 'include'
  }
});