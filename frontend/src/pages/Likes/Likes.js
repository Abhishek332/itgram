import { FollowBox } from "../../components";
import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { axios } from "../../api/axios";
import { NavBar } from "../../components";

const Likes = () => {
  const { postId } = useParams(),
    [likes, setLikes] = useState();

  const fetchLikes = useCallback(() => {
    axios
      .get(`/get-likes/${postId}`)
      .then(({ data: { likes } }) => setLikes(likes))
      .catch((error) => console.log(error));
  }, [postId]);

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  return (
    <>
      <NavBar />
      <div className="page-container">
        {likes?.map((e, i) => (
          <FollowBox {...e} key={`likes-${i + 1}`} fetchData={fetchLikes} />
        ))}
      </div>
    </>
  );
};

export default Likes;
