import axios from "axios";
import config from './../config'

export default axios.create({
  baseURL: config.site202131Url,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "dataType":'jsonp',
    "credentials": 'include'
  }
});