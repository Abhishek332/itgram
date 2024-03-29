import "./CreatePost.scss";
import { useState, useEffect } from "react";
import { Loader2, Loader3 } from "../../assets/images";
import { NavBar, Loader } from "../../components";
import { FileUploader } from "react-drag-drop-files";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPostCall, imageUploader } from "../../redux/create_post/action";
import { useToaster, ToastBox } from "../../utils/toaster";
import { CREATE_POST, IMAGE_UPLOAD } from "../../redux/create_post/constant";

const fileTypes = ["JPEG", "PNG", "GIF", "WEBP", "JPG"];

const CreatePost = () => {
  const navigate = useNavigate(),
    dispatch = useDispatch(),
    toaster = useToaster(),
    [state, setState] = useState({
      title: "",
      body: "",
    }),
    { title, body } = state,
    { loading, success, error } = useSelector((state) => state.createPost),
    { imageUploading, imageUrl } = useSelector((state) => state.imageUpload);

  useEffect(() => {
    if (!localStorage.getItem("userInfo")) navigate("/");
  }, [navigate]);

  useEffect(() => {
    if (!success) return;
    dispatch({ type: CREATE_POST.NULL });
    dispatch({ type: IMAGE_UPLOAD.NULL });
    navigate("/homepage");
  }, [dispatch, navigate, success, toaster]);

  useEffect(() => {
    if (!error) return;
    toaster("error", error);
    dispatch({ type: CREATE_POST.NULL });
  }, [error, toaster, dispatch]);

  const handleChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };

  const handleSubmit = () => {
    dispatch(createPostCall({ ...state, photo: imageUrl }));
  };

  return (
    <>
      <NavBar />
      <div className="create-post-container">
        <div className="form-wrapper">
          <FileUploader
            className="img-handler"
            handleChange={(file) => dispatch(imageUploader(file))}
            onDrop={(file) => dispatch(imageUploader(file))}
            name="photo"
            types={fileTypes}
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={handleChange}
          />
          <textarea
            name="body"
            placeholder="Enter post description"
            value={body}
            onChange={handleChange}
          />
          <button className="post-btn" onClick={handleSubmit}>
            Post
          </button>
        </div>
      </div>
      {loading && <Loader Illustration={Loader3} />}
      {imageUploading && <Loader Illustration={Loader2} />}
      <ToastBox />
    </>
  );
};

export default CreatePost;
