import { CommentBox } from "../../components";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { axios } from "../../api/axios";
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

export default Comments;
