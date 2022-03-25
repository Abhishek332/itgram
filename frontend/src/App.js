import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  OnBoarding,
  Authenticator,
  Profile,
  HomePage,
  CreatePost,
  Comments,
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
        <Route path="/profile/:userId" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
