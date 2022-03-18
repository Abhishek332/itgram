import "./PostCard.scss";
import {
  AiFillHeart,
  // AiOutlineHeart,
  AiOutlineComment,
} from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { useState } from "react";
import { Like } from "../../assets/images";
import { axios } from "../../api/axios";

const PostCard = ({ title, body, photo, postedBy, _id }) => {
  const [likeAnimation, setLikeAnimation] = useState(false);

  const handleLike = () => {
    setLikeAnimation(true);
    axios
      .put("/like", { postId: _id })
      .then((res) => console.log("result", res.data.result))
      .catch((err) => console.log("error", err));
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
          onDoubleClick={() => handleLike()}
        />
        {likeAnimation && <img src={Like} alt="" className="like-animation" />}
      </div>
      <div className="footer">
        <h3>{title}</h3>
        <p>{body}</p>
        <div className="footer-top">
          <AiFillHeart />
          {/* <AiOutlineHeart /> */}
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
