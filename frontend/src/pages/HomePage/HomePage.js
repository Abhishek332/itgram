import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar, PostCard, Footer, Loader } from "../../components";
import { allPostCall } from "../../redux/homepage/action";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "../../assets/images";
import { axios } from "../../api/axios";
import { useToaster, ToastBox } from "../../utils/toaster";

const HomePage = () => {
  const navigate = useNavigate(),
    toaster = useToaster(),
    dispatch = useDispatch(),
    { loading, allpost } = useSelector((state) => state.allPost);

  useEffect(() => {
    if (!localStorage.getItem("userInfo")) navigate("/");
  }, [navigate]);

  useEffect(() => {
    dispatch(allPostCall());
  }, [dispatch]);

  const handleDeletePost = (postId) => {
    axios
      .put(`/delete-post/${postId}`)
      .then(({ data: { message } }) => {
        toaster("success", message);
        dispatch(allPostCall());
      })
      .catch((err) => console.log(err));
  };

  console.log("allpost", allpost);

  return (
    <>
      <NavBar />
      <div className="page-container">
        {allpost &&
          allpost.map((Post, index) => (
            <PostCard
              key={`post-${index}`}
              {...Post}
              handleDeletePost={handleDeletePost}
            />
          ))}
      </div>
      <Footer />
      <ToastBox />
      {loading && <Loader Illustration={Loader2} />}
    </>
  );
};

export default HomePage;
