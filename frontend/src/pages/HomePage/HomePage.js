import { useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  NavBar,
  PostCard,
  Footer,
  Loader,
  PortFolioForm,
} from "../../components";
import { allPostCall } from "../../redux/homepage/action";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "../../assets/images";
import { useToaster, ToastBox } from "../../utils/toaster";

const HomePage = () => {
  const { state } = useLocation(),
    source = state?.source || "auto-redirect",
    navigate = useNavigate(),
    toaster = useToaster(),
    dispatch = useDispatch(),
    { loading, allpost } = useSelector((state) => state.allPost);

  useEffect(() => {
    if (!localStorage.getItem("userInfo")) navigate("/");
  }, [navigate]);

  const getData = useCallback(
    (message = null) => {
      dispatch(allPostCall());
      message && toaster("success", message);
    },
    [dispatch, toaster]
  );

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBar />
      <div className="page-container">
        {allpost &&
          allpost.map((Post, index) => (
            <PostCard key={`post-${index}`} {...Post} getData={getData} />
          ))}
      </div>
      <Footer />
      <ToastBox />
      {loading && <Loader Illustration={Loader2} />}
      <PortFolioForm source={source} />
    </>
  );
};

export default HomePage;
