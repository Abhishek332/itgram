import Axios from "axios";

export const axios = Axios.create({
  // baseURL: "http://localhost:5000/",
  header: {
    "Content-Type": "application/json",
  },
});
