import { IMAGE_UPLOAD, CREATE_POST } from "../constants/postConstants";
import { IntialState } from "../storeConfig/IntialState";

export const ImageUploaderReducer = (
  state = IntialState.imageUpload,
  action
) => {
  switch (action.type) {
    case IMAGE_UPLOAD.REQUEST:
      return { imageUploading: true };
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
      return { loading: true };
    case CREATE_POST.SUCCESS:
      return { loading: false, success: action.payload };
    case CREATE_POST.FAIL:
      return { loading: false, error: action.payload };
    case CREATE_POST.NULL:
      return { loading: false, success: null, error: null };
    default:
      return state;
  }
};
