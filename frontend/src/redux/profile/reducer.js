import { MY_POST } from "./constant";

const myPostState = {
  loading: false,
  mypost: null,
};

export const MyPostReducer = (state = myPostState, action) => {
  switch (action.type) {
    case MY_POST.REQUEST:
      return { loading: true, mypost: null };
    case MY_POST.SUCCESS:
      return { loading: false, mypost: action.payload };
    default:
      return state;
  }
};
