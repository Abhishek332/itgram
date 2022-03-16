import { CREATE_POST, IMAGE_UPLOAD } from "./constant";
import Axios from "axios";
import { axios } from "../../api/axios";

export const imageUploader = (file) => {
  return async (dispatch) => {
    dispatch({ type: IMAGE_UPLOAD.REQUEST });
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "itgram");
      data.append("cloud_name", "itgrampics");
      Axios.post(
        "https://api.cloudinary.com/v1_1/itgrampics/image/upload",
        data
      )
        .then((res) =>
          dispatch({ type: IMAGE_UPLOAD.SUCCESS, payload: res.data.secure_url })
        )
        .catch((error) => console.error(error));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createPostCall = (obj = { title: "", body: "", photo: "" }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_POST.REQUEST });
    try {
      axios
        .post("/create-post", obj)
        .then((res) => {
          dispatch({ type: CREATE_POST.SUCCESS, payload: res.data });
        })
        .catch((err) => {
          dispatch({
            type: CREATE_POST.FAIL,
            payload: err.response.data.error,
          });
        });
    } catch (error) {
      console.error(error);
      dispatch({ type: CREATE_POST.FAIL, payload: "Something went wrong." });
    }
  };
};
