import "./Authenticator.scss";
import { WelCome, Lock } from "../../assets/images";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSignUp, userLogIn } from "../../redux/actions/authActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Authenticator = () => {
  const { search } = useLocation(),
    navigate = useNavigate(),
    dispatch = useDispatch(),
    {
      loading: UserSignUpLoading,
      userInfo: UserSignUpInfo,
      error: UserSignUpError,
    } = useSelector((state) => state.userSignUp),
    {
      loading: UserLogInLoading,
      userInfo: UserLogInInfo,
      error: UserLogInError,
    } = useSelector((state) => state.userLogIn),
    [showSignUp, setShowSignUp] = useState(search.includes("signup")),
    [state, setState] = useState(
      showSignUp
        ? {
            name: "",
            email: "",
            password: "",
          }
        : {
            email: "",
            password: "",
          }
    );

  useEffect(() => {
    if (UserSignUpError) {
      toast.error(UserSignUpError, {
        position: "bottom-center",
        autoClose: 2000,
      });
      if (UserSignUpError === "User already exists, please Login")
        setShowSignUp(false);
    }
  }, [UserSignUpError]);

  useEffect(() => {
    if (UserLogInError) {
      toast.error(UserLogInError, {
        position: "bottom-center",
        autoClose: 2000,
      });
      if (UserLogInError === "User doesn't exist, please SignUp")
        setShowSignUp(true);
    }
  }, [UserLogInError]);

  useEffect(() => {
    if (UserSignUpInfo || UserLogInInfo) navigate("/homepage");
  }, [UserSignUpInfo, UserLogInInfo, navigate]);

  const handleChange = ({ target: { name, value } }) => {
      setState({ ...state, [name]: value });
    },
    handleSubmit = () => {
      showSignUp ? dispatch(userSignUp(state)) : dispatch(userLogIn(state));
    };

  return (
    <>
      <div className="authenticator-container">
        <div className="auth-box">
          <div className="form-box">
            <h2>{showSignUp ? "SignUp" : "SignIn"}</h2>
            {showSignUp && (
              <input
                type="text"
                name="name"
                placeholder="Enter your name*"
                value={state.name}
                onChange={handleChange}
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Enter your email*"
              value={state.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password*"
              value={state.password}
              onChange={handleChange}
              required
            />
            <button onClick={handleSubmit}>Submit</button>
            <p>
              {showSignUp
                ? "Already have an account?"
                : "Don't have an account?"}
              <span onClick={() => setShowSignUp(!showSignUp)}>
                {showSignUp ? " SignIn" : " SignUp"}
              </span>
            </p>
          </div>
          <img src={WelCome} alt="" />
        </div>
      </div>
      {(UserSignUpLoading || UserLogInLoading) && (
        <div className="lock-loader">
          <img src={Lock} alt="" />
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Authenticator;
