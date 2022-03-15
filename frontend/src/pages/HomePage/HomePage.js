import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar, PostCard, Footer, Loader } from "../../components";
import "./HomePage.scss";
import { allPostCall } from "../../redux/actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "../../assets/images";
import { useToaster, ToastBox } from "../../utils/toaster";

const HomePage = () => {
  const navigate = useNavigate(),
    dispatch = useDispatch(),
    toaster = useToaster(),
    { loading, allpost, error } = useSelector((state) => state.allPost);

  useEffect(() => {
    if (!localStorage.getItem("userInfo")) navigate("/authenticator");
  }, [navigate]);

  useEffect(() => {
    dispatch(allPostCall());
  }, [dispatch]);

  useEffect(() => {
    if (!error) return;
    toaster("error", error);
  }, [error, toaster]);

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
      <ToastBox />
    </>
  );
};

export default HomePage;
