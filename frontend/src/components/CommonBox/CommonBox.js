import { MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";
import { axios } from "../../api/axios";
import "./CommonBox.scss";

const CommonBox = ({ hasComment, fetchData, ...obj }) => {
  const { postId } = useParams(),
    loggedUserId = JSON.parse(localStorage.getItem("userInfo"))._id,
    postedBy = obj.postedBy;

  const handleDelete = () => {
      axios
        .put(`/delete-comment/${postId}`, obj)
        .then(() => fetchData())
        .catch((error) => console.log(error));
    },
    handleFollowUnfollow = (option) => {
      axios
        .put(`/${option}/${postedBy._id}`)
        .then(() => fetchData())
        .catch((error) => console.log(error));
    };

  return (
    <>
      <div className="comment-box">
        <div>
          <span className="name">{postedBy.name}</span>
          {loggedUserId !== postedBy._id &&
            (postedBy.followers.includes(loggedUserId) ? (
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
        {hasComment && (
          <div>
            <span className="comment">{obj.text}</span>
            {loggedUserId === postedBy._id && (
              <MdDelete className="delete-btn" onClick={handleDelete} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CommonBox;
