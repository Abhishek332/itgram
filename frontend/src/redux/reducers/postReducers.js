import { IMAGE_UPLOAD } from "../constants/postConstants";
import { IntialState } from "../storeConfig/IntialState";

export const ImageUploadReducer = (state = IntialState.imageUrl, action) => {
  switch (action.type) {
    case IMAGE_UPLOAD: {
      console.log("action.payload", action.payload);
      return action.payload;
    }
    default:
      return state;
  }
};
