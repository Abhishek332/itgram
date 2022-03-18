import "./PostCard.scss";
import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { useState } from "react";
import { Like } from "../../assets/images";
import { axios } from "../../api/axios";

const PostCard = ({ title, body, photo, postedBy, _id, likes, comments }) => {
  const userId = JSON.parse(localStorage.getItem("userInfo"))._id,
    [liked, setLiked] = useState(likes.includes(userId)),
    [likeAnimation, setLikeAnimation] = useState(false),
    [textArea, setTextArea] = useState();

  const handleLike_UnLike = (val) => {
      axios
        .put(`/${val}`, { postId: _id })
        .then((res) => setLiked(res.data.result.likes.includes(userId)))
        .catch((err) => console.log("error", err));
    },
    handleLikeAnimation = () => {
      setLikeAnimation(true);
      handleLike_UnLike("like");
      setTimeout(() => {
        setLikeAnimation(false);
      }, 1000);
    },
    handleComment = () => {
      axios
        .put("/comment", { postId: _id, text: textArea })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
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
          onDoubleClick={handleLikeAnimation}
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
        <span>{`${likes.length} likes | ${comments.length} comments`}</span>
        <div className="comment-box">
          <textarea
            placeholder="comment here ..."
            value={textArea}
            onChange={(e) => setTextArea(e.target.value)}
          ></textarea>
          <FiSend className="comment-btn" onClick={handleComment} />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
