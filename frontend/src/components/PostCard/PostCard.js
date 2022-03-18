import "./PostCard.scss";
import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { useState } from "react";
import { Like } from "../../assets/images";
import { axios } from "../../api/axios";

const PostCard = ({ title, body, photo, postedBy, _id, likes, comments }) => {
  const userId = JSON.parse(localStorage.getItem("userInfo"))._id,
    [liked, setLiked] = useState(likes.includes(userId)),
    [likeAnimation, setLikeAnimation] = useState(false);

  const handleLike_UnLike = (val) => {
    axios
      .put(`/${val}`, { postId: _id })
      .then((res) => setLiked(res.data.result.likes.includes(userId)))
      .catch((err) => console.log("error", err));
  };

  const handleLike = () => {
    setLikeAnimation(true);
    handleLike_UnLike("like");
    setTimeout(() => {
      setLikeAnimation(false);
    }, 1000);
  };

  return (
    <div className="post-card-wrapper">
      <div className="header">
        <h3>{postedBy.name}</h3>
        <button className="follow-btn">Follow</button>
      </div>
      <div className="post-img-wrapper">
        <img
          className="post-img"
          src={photo}
          alt=""
          onDoubleClick={handleLike}
        />
        {likeAnimation && <img src={Like} alt="" className="like-animation" />}
      </div>
      <div className="footer">
        <h3>{title}</h3>
        <p>{body}</p>
        <div className="footer-top">
          {liked ? (
            <AiFillHeart onClick={() => handleLike_UnLike("unlike")} />
          ) : (
            <AiOutlineHeart onClick={() => handleLike_UnLike("like")} />
          )}
          <AiOutlineComment />
        </div>

        <div className="comment-box">
          <textarea placeholder="comment here ..."></textarea>
          <FiSend className="comment-btn" />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
