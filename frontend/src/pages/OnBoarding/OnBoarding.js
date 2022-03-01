import "./OnBoarding.scss";
import { WelCome } from "../../assets/images";
import { Link } from "react-router-dom";

const OnBoarding = () => {
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
            <button>
              <Link to="/authenticator/?theme=signup" className="button">
                Join Us Now
              </Link>
            </button>
            <p className="signin">
              Already have an account?{" "}
              <Link to="/authenticator/?theme=signin" className="link">
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
