import { USER_SIGNUP, USER_LOGIN } from "../constants/authConstants";
import { axios } from "../../api/axios";

export const userSignUp = (obj = { name: "", email: "", password: "" }) => {
  return (dispatch) => {
    dispatch({ type: USER_SIGNUP.USER_SIGNUP_REQUEST });

    axios
      .post("/signup", obj)
      .then((res) =>
        dispatch({ type: USER_SIGNUP.USER_SIGNUP_SUCCESS, payload: res.data })
      )
      .catch((err) =>
        dispatch({
          type: USER_SIGNUP.USER_SIGNUP_FAIL,
          payload: err.response.data.error,
        })
      );
  };
};

export const userLogIn = (obj = { email: "", password: "" }) => {
  return (dispatch) => {
    dispatch({ type: USER_LOGIN.REQUEST });

    axios
      .post("/signin", obj)
      .then((res) => dispatch({ type: USER_LOGIN.SUCCESS, payload: res.data }))
      .catch((err) =>
        dispatch({
          type: USER_LOGIN.FAIL,
          payload: err.response.data.error,
        })
      );
  };
};
