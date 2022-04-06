import { NavBar, PostCard } from "../../components";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { axios } from "../../api/axios";

const UserPosts = () => {
  const { userId } = useParams(),
    [data, setData] = useState();

  const getData = useCallback(() => {
    axios
      .get(`/get-user-posts/${userId}`)
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  }, [userId]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar />
      <div className="page-conttainer">
        {data &&
          data.map((post, index) => (
            <PostCard key={`user-post-${index + 1}`} {...post} />
          ))}
      </div>
    </>
  );
};

export default UserPosts;
