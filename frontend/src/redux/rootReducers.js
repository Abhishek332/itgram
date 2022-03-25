import { combineReducers } from "redux";

import { UserSignUpReducer } from "./signup/reducer";
import { UserLogInReducer } from "./login/reducer";
import { ImageUploaderReducer, CreatePostReducer } from "./create_post/reducer";
import { AllPostReducer } from "./homepage/reducer";
import { ProfileReducer } from "./profile/reducer";

export const rootReducer = combineReducers({
  userSignUp: UserSignUpReducer,
  userLogIn: UserLogInReducer,
  imageUpload: ImageUploaderReducer,
  createPost: CreatePostReducer,
  allPost: AllPostReducer,
  profile: ProfileReducer,
});
