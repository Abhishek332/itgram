import { IMAGE_UPLOAD, CREATE_POST } from "./constant";

const imageUploadState = {
  imageUploading: false,
  imageUrl: null,
};

const createPostState = {
  loading: false,
  success: null,
  error: null,
};

export const ImageUploaderReducer = (state = imageUploadState, action) => {
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

export const CreatePostReducer = (state = createPostState, action) => {
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
