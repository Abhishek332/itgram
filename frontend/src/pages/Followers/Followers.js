import { FollowBox } from "../../components";
import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { axios } from "../../api/axios";
import { NavBar } from "../../components";

const Followers = () => {
  const { userId } = useParams(),
    [followers, setFollowers] = useState();

  const fetchFollowers = useCallback(() => {
    axios
      .get(`/get-followers/${userId}`)
      .then(({ data: { followers } }) => setFollowers(followers))
      .catch((error) => console.log(error));
  }, [userId]);

  useEffect(() => {
    fetchFollowers();
  }, [fetchFollowers]);

  return (
    <>
      <NavBar />
      <div className="page-container">
        {followers?.map((e, i) => (
          <FollowBox
            {...e}
            key={`follower-${i + 1}`}
            fetchData={fetchFollowers}
          />
        ))}
      </div>
    </>
  );
};

export default Followers;
