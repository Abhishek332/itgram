import { USER_LOGIN } from "./constant";
import { axios } from "../../api/axios";

export const userLogIn = (obj = { email: "", password: "" }) => {
  return async (dispatch) => {
    dispatch({ type: USER_LOGIN.REQUEST });

    try {
      axios
        .post("/signin", obj)
        .then((res) => {
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          dispatch({ type: USER_LOGIN.SUCCESS, payload: res.data });
        })
        .catch((err) => {
          dispatch({
            type: USER_LOGIN.FAIL,
            payload: err.response.data.error,
          });
        });
    } catch (error) {
      console.log(error);
      dispatch({
        type: USER_LOGIN.FAIL,
        payload: "Something Went Wrong, Please try again",
      });
    }
  };
};
