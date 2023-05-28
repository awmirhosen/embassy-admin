import Axios from "axios";
export const axios = Axios.create({
  baseURL: "http://156.253.5.224",
  headers : {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});

export const axiosLogin = Axios.create({
  baseURL: "http://156.253.5.224",
});
