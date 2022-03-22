import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { axios } from "../../api/axios";
import { MdDelete } from "react-icons/md";
import "./Comments.scss";
import { NavBar } from "../../components";

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
    <>
      <NavBar />
      <div className="comment-page-container">
        {comments?.map((e, i) => (
          <CommentBox
            {...e}
            key={`comment-${i + 1}`}
            setComments={setComments}
          />
        ))}
      </div>
    </>
  );
};

const CommentBox = ({ setComments, ...obj }) => {
  const { postId } = useParams(),
    userId = JSON.parse(localStorage.getItem("userInfo"))._id,
    {
      postedBy: { _id, name },
      text,
    } = obj;

  const handleDelete = () => {
    axios
      .put(`/delete-comment/${postId}`, obj)
      .then(({ data: { comments } }) => setComments(comments))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="comment-box">
        <div>
          <span className="name">{name}</span>
          <button className="follow-btn">Follow</button>
        </div>
        <div>
          <span className="comment">{text}</span>
          {userId === _id && (
            <MdDelete className="delete-btn" onClick={handleDelete} />
          )}
        </div>
      </div>
    </>
  );
};

export default Comments;
