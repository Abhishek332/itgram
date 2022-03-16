import { USER_SIGNUP } from "./constant";

const userSignUpState = {
  loading: false,
  userInfo: null,
  error: null,
};

export const UserSignUpReducer = (state = userSignUpState, action) => {
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
