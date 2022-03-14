import { USER_SIGNUP, USER_LOGIN } from "../constants/authConstants";
import { IntialState } from "../storeConfig/IntialState";

export const UserSignUpReducer = (state = IntialState.userSignUp, action) => {
  switch (action.type) {
    case USER_SIGNUP.REQUEST:
      return { loading: true, userInfo: null, error: null };
    case USER_SIGNUP.SUCCESS:
      return { loading: false, userInfo: action.payload, error: null };
    case USER_SIGNUP.FAIL:
      return { loading: false, userInfo: null, error: action.payload };
    case USER_SIGNUP.NULL:
      return { loading: false, userInfo: null, error: null };
    default:
      return state;
  }
};

export const UserLogInReducer = (state = IntialState.userLogIn, action) => {
  switch (action.type) {
    case USER_LOGIN.REQUEST:
      return { loading: true, userInfo: null, error: null };
    case USER_LOGIN.SUCCESS:
      return { loading: false, userInfo: action.payload, error: null };
    case USER_LOGIN.FAIL:
      return { loading: false, userInfo: null, error: action.payload };
    case USER_LOGIN.NULL:
      return { loading: false, userInfo: null, error: null };
    default:
      return state;
  }
};
