import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar, PostCard, Footer, Loader } from "../../components";
import "./HomePage.scss";
import { allPostCall } from "../../redux/homepage/action";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "../../assets/images";

const HomePage = () => {
  const navigate = useNavigate(),
    dispatch = useDispatch(),
    { loading, allpost } = useSelector((state) => state.allPost);

  useEffect(() => {
    if (!localStorage.getItem("userInfo")) navigate("/");
  }, [navigate]);

  useEffect(() => {
    dispatch(allPostCall());
  }, [dispatch]);

  console.log("allpost", allpost);

  return (
    <>
      <NavBar />
      <div className="home-page-container">
        {allpost &&
          allpost.map((Post, index) => (
            <PostCard key={`post-${index}`} {...Post} />
          ))}
      </div>
      <Footer />
      {loading && <Loader Illustration={Loader2} />}
    </>
  );
};

export default HomePage;
