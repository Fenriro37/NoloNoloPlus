import axios from "axios";

export default axios.create({
  // baseURL: "http://site202131.tw.cs.unibo.it:8000",
  baseURL: "http://localhost:8081",
  headers: {
    "Content-type": "application/json",
    "dataType": "jsonp",
    "withCredentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, DELETE",
    "Access-Control-Allow-Origin": "true"
    // "Access-Control-Allow-Origin": "http://site202131.tw.cs.unibo.it:8000"
    // "Access-Control-Allow-Origin": "http://localhost:8081",
  }
});