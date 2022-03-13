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
console.log("Header", Header);

export const axios = Axios.create({
  headers: Header,
});
