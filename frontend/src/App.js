import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import {
  OnBoarding,
  Authenticator,
  Profile,
  HomePage,
  CreatePost,
} from "./pages";

const App = () => {
  const isLoggedIn = localStorage.getItem("userInfo");

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<OnBoarding />} />
          <Route path="/authenticator" element={<Authenticator />} />
          <Route
            path="/profile"
            element={
              isLoggedIn ? <Profile /> : <Navigate to="/authenticator" />
            }
          />
          <Route
            path="/homepage"
            element={
              isLoggedIn ? <HomePage /> : <Navigate to="/authenticator" />
            }
          />
          <Route
            path="/create-post"
            element={
              isLoggedIn ? <CreatePost /> : <Navigate to="/authenticator" />
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
