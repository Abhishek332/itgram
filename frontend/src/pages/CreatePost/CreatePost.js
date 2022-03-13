import "./CreatePost.scss";
import { useState, useEffect } from "react";
import { Loader2, Loader3 } from "../../assets/images";
import { NavBar, Loader } from "../../components";
import { FileUploader } from "react-drag-drop-files";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPost, imageUploader } from "../../redux/actions/postActions";
import { useToaster, ToastBox } from "../../utils/toaster";
import { CREATE_POST, IMAGE_UPLOAD } from "../../redux/constants/postConstants";

const fileTypes = ["JPEG", "PNG", "GIF", "WEBP"];

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
    if (!localStorage.getItem("userInfo")) navigate("/authenticator");
  }, [navigate]);

  useEffect(() => {
    if (!success) return;
    toaster("success", success.message);
    dispatch({ type: CREATE_POST.NULL });
  }, [dispatch, success, toaster]);

  useEffect(() => {
    if (!error) return;
    toaster("error", error);
    dispatch({ type: CREATE_POST.NULL });
  }, [error, toaster, dispatch]);

  const handleChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };

  const handleSubmit = () => {
    dispatch(createPost({ ...state, photo: imageUrl }));
    dispatch({ type: IMAGE_UPLOAD.NULL });
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
