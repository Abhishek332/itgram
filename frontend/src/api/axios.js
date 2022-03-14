import Axios from "axios";

const userInfo = localStorage.getItem("userInfo") || null;

let Header = {
  "Content-Type": "application/json",
};
if (userInfo) {
  Header = {
    "Content-Type": "application/json",
    Authorization: JSON.parse(userInfo).token,
  };
}

export const axios = Axios.create({
  headers: Header,
});
