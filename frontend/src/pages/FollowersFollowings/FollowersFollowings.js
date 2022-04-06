import { FollowBox } from "../../components";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { axios } from "../../api/axios";
import { NavBar } from "../../components";

const FollowersFollowings = () => {
  const { userId } = useParams(),
    { pathname } = useLocation(),
    [data, setData] = useState();

  const fetchData = useCallback(() => {
    axios
      .get(
        `/${
          pathname.includes("followers") ? "get-followers" : "get-followings"
        }/${userId}`
      )
      .then(({ data }) => setData(data))
      .catch((error) => console.log(error));
  }, [pathname, userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <NavBar />
      <div className="page-container">
        {data?.map((e, i) => (
          <FollowBox {...e} key={`follower-${i + 1}`} fetchData={fetchData} />
        ))}
      </div>
    </>
  );
};

export default FollowersFollowings;
