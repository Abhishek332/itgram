import { PROFILE } from "./constant";

const profileState = {
  loading: false,
  user: null,
  posts: null,
};

export const ProfileReducer = (state = profileState, action) => {
  switch (action.type) {
    case PROFILE.REQUEST:
      return { loading: true, user: null, posts: null };
    case PROFILE.SUCCESS:
      return {
        loading: false,
        user: action.payload.user,
        posts: action.payload.posts,
      };
    default:
      return state;
  }
};
