import { MY_POST } from "./constant";
import { axios } from "../../api/axios";

export const myPostCall = () => {
  return async (dispatch) => {
    dispatch({ type: MY_POST.REQUEST });
    try {
      axios
        .get("/mypost")
        .then((res) =>
          dispatch({ type: MY_POST.SUCCESS, payload: res.data.mypost })
        );
    } catch (error) {
      console.log(error);
    }
  };
};
