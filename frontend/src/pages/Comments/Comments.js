import { CommentBox } from "../../components";
import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { axios } from "../../api/axios";
import "./Comments.scss";
import { NavBar } from "../../components";

const Comments = () => {
  const { postId } = useParams(),
    [comments, setComments] = useState();

  const fetchComments = useCallback(() => {
    axios
      .get(`/get-comments/${postId}`)
      .then(({ data: { comments } }) => setComments(comments))
      .catch((error) => console.log(error));
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <>
      <NavBar />
      <div className="comment-page-container">
        {comments?.map((e, i) => (
          <CommentBox
            {...e}
            key={`comment-${i + 1}`}
            fetchComments={fetchComments}
          />
        ))}
      </div>
    </>
  );
};

export default Comments;
