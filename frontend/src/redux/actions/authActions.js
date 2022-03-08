import { USER_SIGNUP, USER_LOGIN } from "../constants/authConstants";
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
