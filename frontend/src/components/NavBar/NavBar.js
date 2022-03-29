import "./NavBar.scss";
import { Logo, DefaultAvatar } from "../../assets/images";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { USER_LOGIN } from "../../redux/login/constant";
import { USER_SIGNUP } from "../../redux/signup/constant";
import { BiArrowBack } from "react-icons/bi";

const NavBar = () => {
  const navigate = useNavigate(),
    { pathname } = useLocation(),
    dispatch = useDispatch(),
    [toggler, setToggler] = useState(false),
    userInfo = JSON.parse(localStorage.getItem("userInfo") ?? ""),
    userId = userInfo._id,
    profilePic = userInfo.profilePic,
    handleLogout = () => {
      localStorage.clear();
      dispatch({ type: USER_SIGNUP.NULL });
      dispatch({ type: USER_LOGIN.NULL });
      navigate("/");
    };

  return (
    <>
      <div className="nav-wrapper">
        <Link to="/homepage" className="logo" onClick={() => setToggler(false)}>
          {pathname.includes("comments" || "likes") ? (
            <BiArrowBack style={{ cursor: "pointer", fontSize: "22px" }} />
          ) : (
            <img src={Logo} alt="" />
          )}
        </Link>
        <div className="avatar-icon" onClick={() => setToggler(!toggler)}>
          {profilePic === "default" ? (
            <img src={DefaultAvatar} alt="" />
          ) : (
            <img src={profilePic} alt="" />
          )}
        </div>
        <div
          className="toggler"
          style={
            toggler
              ? { transform: "translateX(0%)" }
              : { transform: "translateX(100%)" }
          }
        >
          <Link to={`/profile/${userId}`} className="nav-link">
            Profile
          </Link>
          <p className="nav-link" onClick={() => handleLogout()}>
            Logout
          </p>
        </div>
      </div>
    </>
  );
};

export default NavBar;
