import { ALL_POST } from "./constant";

const allPostState = {
  loading: false,
  allpost: null,
};

export const AllPostReducer = (state = allPostState, action) => {
  switch (action.type) {
    case ALL_POST.REQUEST:
      return { loading: true, allpost: null };
    case ALL_POST.SUCCESS:
      return { loading: false, allpost: action.payload };
    default:
      return state;
  }
};
