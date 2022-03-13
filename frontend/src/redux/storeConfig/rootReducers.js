import { combineReducers } from "redux";

import { UserSignUpReducer, UserLogInReducer } from "../reducers/authReducers";
import {
  ImageUploaderReducer,
  CreatePostReducer,
} from "../reducers/postReducers";

export const rootReducer = combineReducers({
  userSignUp: UserSignUpReducer,
  userLogIn: UserLogInReducer,
  imageUpload: ImageUploaderReducer,
  createPost: CreatePostReducer,
});
