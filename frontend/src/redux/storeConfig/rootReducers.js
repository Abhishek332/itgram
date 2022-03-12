import { combineReducers } from "redux";

import { UserSignUpReducer, UserLogInReducer } from "../reducers/authReducers";
import { ImageUploadReducer } from "../reducers/postReducers";

export const rootReducer = combineReducers({
  userSignUp: UserSignUpReducer,
  userLogIn: UserLogInReducer,
  imageUrl: ImageUploadReducer,
});
