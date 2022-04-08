import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  OnBoarding,
  Authenticator,
  Profile,
  HomePage,
  CreatePost,
  Comments,
  Likes,
  UpdatePic,
  Post,
  FollowersFollowings,
  UserPosts,
  PortFolio,
} from "./pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OnBoarding />} />
        <Route path="/authenticator" element={<Authenticator />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/comments/:postId" element={<Comments />} />
        <Route path="/likes/:postId" element={<Likes />} />
        <Route path="/followers/:userId" element={<FollowersFollowings />} />
        <Route path="/followings/:userId" element={<FollowersFollowings />} />
        <Route path="/profile/:followingId" element={<Profile />} />
        <Route path="/update-pic" element={<UpdatePic />} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/user-posts/:userId" element={<UserPosts />} />
        <Route path="/portfolio/:userId" element={<PortFolio />} />
      </Routes>
    </Router>
  );
};

export default App;
