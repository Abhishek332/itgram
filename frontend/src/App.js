import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { OnBoarding, Authenticator, Profile, HomePage } from "./pages";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<OnBoarding />} />
          <Route path="/authenticator" element={<Authenticator />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/homepage" element={<HomePage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
