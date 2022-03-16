import "./Authenticator.scss";
import { WelCome, Lock } from "../../assets/images";
import { Loader } from "../../components";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useToaster, ToastBox } from "../../utils/toaster";
import { USER_LOGIN } from "../../redux/login/constant";
import { USER_SIGNUP } from "../../redux/signup/constant";
import { userSignUp } from "../../redux/signup/action";
import { userLogIn } from "../../redux/login/action";

const Authenticator = () => {
  const { search } = useLocation(),
    navigate = useNavigate(),
    dispatch = useDispatch(),
    toaster = useToaster(),
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
    [state, setState] = useState({
      name: "",
      email: "",
      password: "",
    });

  useEffect(() => {
    if (UserSignUpError) {
      if (!UserSignUpError) return;
      toaster("error", UserSignUpError);
      dispatch({ type: USER_SIGNUP.NULL });
      if (UserSignUpError === "User already exists, please Login")
        setShowSignUp(false);
    }
  }, [UserSignUpError, dispatch, toaster]);

  useEffect(() => {
    if (UserLogInError) {
      if (!UserLogInError) return;
      toaster("error", UserLogInError);
      dispatch({ type: USER_LOGIN.NULL });
      if (UserLogInError === "User doesn't exist, please SignUp")
        setShowSignUp(true);
    }
  }, [UserLogInError, dispatch, toaster]);

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
        <Loader Illustration={Lock} />
      )}
      <ToastBox />
    </>
  );
};

export default Authenticator;
