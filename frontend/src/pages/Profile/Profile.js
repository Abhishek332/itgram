import "./Profile.scss";
import { NavBar, Loader } from "../../components";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { profileDataCall } from "../../redux/profile/action";
import { useDispatch, useSelector } from "react-redux";
import { DefaultAvatar, Loader2 } from "../../assets/images";
import { axios } from "../../api/axios";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
  const { loading, user, posts } = useSelector((state) => state.profile);

  const { followingId } = useParams() || null,
    loggedUserId = JSON.parse(localStorage.getItem("userInfo") ?? "")?._id,
    [userData, setUserData] = useState(),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(profileDataCall(followingId));
  }, [dispatch, followingId]);

  useEffect(() => {
    if (!user) return;
    setUserData(user);
  }, [user]);

  const handleFollowUnfollow = (option) => {
    axios
      .put(`/${option}/${followingId}`)
      .then((res) =>
        setUserData({ ...userData, followers: res.data.followers })
      )
      .catch((error) => console.log(error));
  };

  return (
    <>
      <NavBar />
      <div className="profile-page-container">
        <div className="profile-header">
          <div className="avatar-box">
            <Link to="/update-pic">
              <FaEdit className="edit-btn" />
            </Link>
            <img
              src={
                user?.profilePic === "default"
                  ? DefaultAvatar
                  : user?.profilePic
              }
              alt=""
            />
          </div>
          <div className="profile-info">
            <div className="user-info">
              <p className="username">{user?.name}</p>
              {loggedUserId !== followingId &&
                (userData?.followers?.includes(loggedUserId) ? (
                  <button
                    className="unfollow-btn"
                    onClick={() => handleFollowUnfollow("unfollow")}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className="follow-btn"
                    onClick={() => handleFollowUnfollow("follow")}
                  >
                    Follow
                  </button>
                ))}
            </div>
            <span>{user?.email}</span>
            <div className="other-info">
              <p>{`${posts?.length} posts`}</p>
              <p>
                <Link
                  to={`/followers/${followingId}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {`${userData?.followers?.length} followers`}
                </Link>
              </p>
              <p>
                <Link
                  to={`/followings/${followingId}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {`${userData?.followings?.length} following`}
                </Link>
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div className="gallery">
          {posts?.map(
            (post, i) =>
              post.photo && (
                <div className="gallery-item" key={`item - ${i + 1}`}>
                  <img src={post.photo} alt="" />
                </div>
              )
          )}
        </div>
      </div>
      {loading && <Loader Illustration={Loader2} />}
    </>
  );
};

export default Profile;
