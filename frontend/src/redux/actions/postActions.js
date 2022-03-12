import axios from "axios";
import { IMAGE_UPLOAD } from "../constants/postConstants";

export const imageUploader = (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "itgram");
  data.append("cloud_name", "itgrampics");
  return async (dispatch) => {
    try {
      axios
        .post("https://api.cloudinary.com/v1_1/itgrampics/image/upload", data)
        .then((res) =>
          dispatch({ type: IMAGE_UPLOAD, payload: res.data.secure_url })
        )
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
  };
};
