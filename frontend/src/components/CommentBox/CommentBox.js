import { MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";
import { axios } from "../../api/axios";
import "./CommentBox.scss";
import { useState } from "react";

const CommentBox = ({ setComments, ...obj }) => {
  const { postId } = useParams(),
    loggedUserId = JSON.parse(localStorage.getItem("userInfo"))._id,
    { postedBy, text } = obj,
    [followers, setFollowers] = useState(postedBy.followers);

  const handleDelete = () => {
      axios
        .put(`/delete-comment/${postId}`, obj)
        .then(({ data: { comments } }) => setComments(comments))
        .catch((error) => console.log(error));
    },
    handleFollowUnfollow = (option) => {
      axios
        .put(`/${option}/${postedBy._id}`)
        .then((res) => setFollowers(res.data.followers))
        .catch((error) => console.log(error));
    };

  return (
    <>
      <div className="comment-box">
        <div>
          <span className="name">{postedBy.name}</span>
          {loggedUserId !== postedBy._id &&
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
        <div>
          <span className="comment">{text}</span>
          {loggedUserId === postedBy._id && (
            <MdDelete className="delete-btn" onClick={handleDelete} />
          )}
        </div>
      </div>
    </>
  );
};

export default CommentBox;
