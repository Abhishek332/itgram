import {
  IMAGE_UPLOAD,
  CREATE_POST,
  ALL_POST,
  MY_POST,
} from "../constants/postConstants";
import { IntialState } from "../storeConfig/IntialState";

export const ImageUploaderReducer = (
  state = IntialState.imageUpload,
  action
) => {
  switch (action.type) {
    case IMAGE_UPLOAD.REQUEST:
      return { imageUploading: true, imageUrl: null };
    case IMAGE_UPLOAD.SUCCESS:
      return { imageUploading: false, imageUrl: action.payload };
    case IMAGE_UPLOAD.NULL:
      return { imageUploading: false, imageUrl: null };
    default:
      return state;
  }
};

export const CreatePostReducer = (state = IntialState.craetePost, action) => {
  switch (action.type) {
    case CREATE_POST.REQUEST:
      return { loading: true, success: null, error: null };
    case CREATE_POST.SUCCESS:
      return { loading: false, success: action.payload, error: null };
    case CREATE_POST.FAIL:
      return { loading: false, success: null, error: action.payload };
    case CREATE_POST.NULL:
      return { loading: false, success: null, error: null };
    default:
      return state;
  }
};

export const AllPostReducer = (state = IntialState.allPost, action) => {
  switch (action.type) {
    case ALL_POST.REQUEST:
      return { loading: true, sucess: null };
    case ALL_POST.SUCCESS:
      return { loading: false, allpost: action.payload };
    default:
      return state;
  }
};

export const MyPostReducer = (state = IntialState.myPost, action) => {
  switch (action.type) {
    case MY_POST.REQUEST:
      return { loading: true, sucess: null };
    case MY_POST.SUCCESS:
      return { loading: false, success: action.payload };
    default:
      return state;
  }
};
