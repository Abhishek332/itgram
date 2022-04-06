import { PostCard } from "../../components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axios } from "../../api/axios";

const Post = () => {
  const { postId } = useParams(),
    [data, setData] = useState();

  useEffect(() => {
    axios.get(`/get-post/${postId}`).then((res) => setData(res.data));
  }, [postId]);

  return <>{data && <PostCard {...data} />}</>;
};

export default Post;
