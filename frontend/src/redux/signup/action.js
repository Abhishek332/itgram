import { USER_SIGNUP } from "./constant";
import { axios } from "../../api/axios";

export const userSignUp = (obj = { name: "", email: "", password: "" }) => {
  return async (dispatch) => {
    dispatch({ type: USER_SIGNUP.REQUEST });

    try {
      axios
        .post("/signup", obj)
        .then((res) => {
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          dispatch({ type: USER_SIGNUP.SUCCESS, payload: res.data });
        })
        .catch((err) => {
          dispatch({
            type: USER_SIGNUP.FAIL,
            payload: err.response.data.error,
          });
        });
    } catch (error) {
      console.log(error);
      dispatch({
        type: USER_SIGNUP.FAIL,
        payload: "Something Went Wrong, Please try again",
      });
    }
  };
};
