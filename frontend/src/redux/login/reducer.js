import { USER_LOGIN } from "./constant";

const userLoginState = {
  loading: false,
  userInfo: null,
  error: null,
};

export const UserLogInReducer = (state = userLoginState, action) => {
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
