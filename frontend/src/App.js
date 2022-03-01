import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { OnBoarding, Authenticator } from "./pages";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<OnBoarding />} />
          <Route path="/authenticator" element={<Authenticator />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
