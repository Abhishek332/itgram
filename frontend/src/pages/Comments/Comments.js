import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { axios } from "../../api/axios";
import { MdDelete } from "react-icons/md";
import "./Comments.scss";

const Comments = () => {
  const { postId } = useParams(),
    [comments, setComments] = useState();

  useEffect(() => {
    axios
      .get(`/get-comments/${postId}`)
      .then(({ data: { comments } }) => setComments(comments))
      .catch((error) => console.log(error));
  }, [postId]);

  return (
    <div className="comment-page-container">
      {comments?.map((e, i) => (
        <CommentBox {...e} key={`comment-${i + 1}`} />
      ))}
    </div>
  );
};

const CommentBox = ({ text, postedBy }) => {
  const userId = JSON.parse(localStorage.getItem("userInfo"))._id;

  return (
    <div className="comment-box">
      <div>
        <span className="name">{postedBy.name}</span>
        <button className="follow-btn">Follow</button>
      </div>
      <div>
        <span className="comment">{text}</span>
        {userId === postedBy._id && <MdDelete className="delete-btn" />}
      </div>
    </div>
  );
};

export default Comments;
