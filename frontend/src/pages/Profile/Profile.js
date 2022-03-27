import "./Profile.scss";
import { NavBar, Loader } from "../../components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { profileDataCall } from "../../redux/profile/action";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "../../assets/images";
import { axios } from "../../api/axios";

const Profile = () => {
  const { loading, user, posts } = useSelector((state) => state.profile);

  const { userId } = useParams() || null,
    loggedUserId = JSON.parse(localStorage.getItem("userInfo") ?? "")?._id,
    [userData, setUserData] = useState(),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(profileDataCall(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (!user) return;
    setUserData(user);
  }, [user]);

  const handleFollowUnfollow = (option) => {
    axios
      .put(`/${option}/${userId}`)
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
            <img
              src="data:image/jpeg;base64,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"
              alt=""
            />
          </div>
          <div className="profile-info">
            <div className="user-info">
              <p className="username">{user?.name}</p>
              {loggedUserId !== userId &&
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
              <p>{`${userData?.followings?.length} following`}</p>
              <p>{`${userData?.followers?.length} followers`}</p>
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
