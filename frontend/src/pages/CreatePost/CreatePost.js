import "./CreatePost.scss";
import { useState, useEffect } from "react";
import { Loader3 } from "../../assets/images";
import { NavBar } from "../../components";
import { FileUploader } from "react-drag-drop-files";
import { useNavigate } from "react-router-dom";
import { axios } from "../api/axios";

const fileTypes = ["JPEG", "PNG", "GIF", "WEBP"];

const CreatePost = () => {
  const navigate = useNavigate(),
    [state, setState] = useState({
      title: "",
      body: "",
      photo: "",
    }),
    [loader, setLoader] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("userInfo")) navigate("/authenticator");
  }, [navigate]);

  const handleChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
    console.log("state", state);
  };

  const handlePhotoChange = (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "itgram");
    data.append("cloud_name", "itgrampics");
    axios.post("https://api.clouinary.com/v1_1/itgrampics/image/upload", data);

    console.log("state", state);
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
            handleChange={handlePhotoChange}
            onDrop={handlePhotoChange}
            name="photo"
            types={fileTypes}
            value={state.photo}
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={state.title}
            onChange={handleChange}
          />
          <textarea
            name="body"
            placeholder="Enter post description"
            value={state.body}
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
