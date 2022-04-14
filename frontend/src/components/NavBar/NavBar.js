import "./NavBar.scss";
import { Logo, DefaultAvatar } from "../../assets/images";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { USER_LOGIN } from "../../redux/login/constant";
import { USER_SIGNUP } from "../../redux/signup/constant";
import { BiArrowBack } from "react-icons/bi";

const NavBar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userInfo")) navigate("/");
  }, [navigate]);

  const { pathname } = useLocation(),
    dispatch = useDispatch(),
    [toggler, setToggler] = useState(false),
    userInfo = JSON.parse(localStorage.getItem("userInfo") ?? ""),
    { _id: userId, profilePic } = userInfo;

  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: USER_SIGNUP.NULL });
    dispatch({ type: USER_LOGIN.NULL });
    navigate("/");
  };

  return (
    <>
      <div className="nav-wrapper">
        {pathname.includes("profile" || "homepage") ? (
          <img
            src={Logo}
            className="logo"
            alt=""
            onClick={() => {
              setToggler(false);
              navigate("/homepage");
            }}
          />
        ) : (
          <BiArrowBack
            style={{ cursor: "pointer", fontSize: "22px" }}
            onClick={() => navigate(-1)}
          />
        )}
        <img
          className="avatar-icon"
          src={profilePic === "default" ? DefaultAvatar : profilePic}
          alt=""
          onClick={() => setToggler(!toggler)}
        />
      </div>
      <div
        className="toggler"
        style={toggler ? { zIndex: 99 } : { zIndex: -99 }}
      >
        <div
          className="closer"
          onClick={() => setToggler(false)}
          style={toggler ? { opacity: 1 } : { opacity: 0 }}
        ></div>
        <div
          className="toggler-card"
          style={
            toggler
              ? { transform: "translateX(0%)" }
              : { transform: "translateX(100%)" }
          }
        >
          <Link
            to={`/profile/${userId}`}
            className="nav-link"
            onClick={() => setToggler(!toggler)}
          >
            Profile
          </Link>
          <p className="nav-link" onClick={() => handleLogout()}>
            Logout
          </p>
          <div className="ad">
            <span className="developer">{"Design & Developed by"}</span>
            <h4>Abhishek</h4>
            <span>{`Copyright@${new Date().getFullYear()}`}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
