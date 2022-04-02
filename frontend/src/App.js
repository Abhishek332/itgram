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
        <Route path="/profile/:followingId" element={<Profile />} />
        <Route path="/update-pic" element={<UpdatePic />} />
      </Routes>
    </Router>
  );
};

export default App;
