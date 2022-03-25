import { PROFILE } from "./constant";
import { axios } from "../../api/axios";

export const profileDataCall = (userId) => {
  return async (dispatch) => {
    dispatch({ type: PROFILE.REQUEST });
    try {
      axios
        .get(`/profile/${userId}`)
        .then((res) => dispatch({ type: PROFILE.SUCCESS, payload: res.data }))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
};
