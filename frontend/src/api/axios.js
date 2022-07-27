import Axios from "axios";

const userInfo = localStorage.getItem("userInfo") || null;

let headers = {
    "Content-Type": "application/json",
  },
  baseURL = "http://localhost:5000/";

if (userInfo) {
  headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${JSON.parse(userInfo).token}`,
  };
}

if (process.env.NODE_ENV === "production") {
  baseURL = "https://itgram-backend.herokuapp.com";
}

export const axios = Axios.create({ headers, baseURL });
