import Axios from "axios";
export const axios = Axios.create({
  baseURL: "https://light-planes-enjoy.loca.lt/",
  headers : {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});
