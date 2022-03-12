import "./OnBoarding.scss";
import { WelCome } from "../../assets/images";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OnBoarding = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userInfo")) navigate("/homepage");
  }, []);

  return (
    <>
      <div className="onboarding-container">
        <div className="outer-box">
          <div className="inner-box">
            <h1>Let's Build IT Unity</h1>
            <p>
              A place to connect all the IT industry professionals, connect with
              them and share knowleadge by posts.
            </p>
            <Link to="/authenticator/?signup" className="button">
              <button>Join Us Now</button>
            </Link>
            <p className="signin">
              Already have an account?{" "}
              <Link to="/authenticator/?signin" className="link">
                <span>SignIn</span>
              </Link>
            </p>
          </div>
          <img src={WelCome} alt="" />
        </div>
      </div>
    </>
  );
};

export default OnBoarding;
