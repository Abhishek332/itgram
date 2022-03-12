import "./CreatePost.scss";
import { useState, useEffect } from "react";
import { Loader3 } from "../../assets/images";
import { NavBar } from "../../components";
import { FileUploader } from "react-drag-drop-files";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { imageUploader } from "../../redux/actions/postActions";

const fileTypes = ["JPEG", "PNG", "GIF", "WEBP"];

const CreatePost = () => {
  const navigate = useNavigate(),
    dispatch = useDispatch(),
    [state, setState] = useState({
      title: "",
      body: "",
      photo: useSelector((state) => state.imageUrl),
    }),
    [loader, setLoader] = useState(false),
    { title, body } = state;

  useEffect(() => {
    if (!localStorage.getItem("userInfo")) navigate("/authenticator");
  }, [navigate]);

  const handleChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };

  const handleSubmit = () => {
    console.log(state);
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 5000);
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
        {loader && (
          <div className="loader">
            <img src={Loader3} alt="" />
          </div>
        )}
      </div>
    </>
  );
};

export default CreatePost;
