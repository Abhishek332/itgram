import { axios } from "../../api/axios";
import "./FollowBox.scss";

const FollowBox = ({ fetchData, _id, name, followers }) => {
  const loggedUserId = JSON.parse(localStorage.getItem("userInfo"))._id;

  const handleFollowUnfollow = (option) => {
    axios
      .put(`/${option}/${_id}`)
      .then(() => fetchData())
      .catch((error) => console.log(error));
  };

  return (
    <div className="follow-box">
      <span className="name">{name}</span>
      {loggedUserId !== _id &&
        (followers.includes(loggedUserId) ? (
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
  );
};

export default FollowBox;
