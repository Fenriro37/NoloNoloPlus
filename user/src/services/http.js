import axios from "axios";

export default axios.create({
  // baseURL: "http://site202131.tw.cs.unibo.it:8000",
  baseURL: "http://localhost:8081",
  headers: {
    "Content-type": "application/json",
    "dataType": "jsonp",
    withCredentials: true
  }
});