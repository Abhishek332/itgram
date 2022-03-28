import { IMAGE_UPLOAD } from "../../redux/create_post/constant";
import { useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { imageUploader } from "../../redux/create_post/action";
import { axios } from "../../api/axios";
import "./UpdatePic.scss";

const fileTypes = ["JPEG", "PNG", "WEBP", "JPG"];

const UpdatePic = () => {
  const navigate = useNavigate(),
    dispatch = useDispatch(),
    loggedUserId = JSON.parse(localStorage.getItem("userInfo") ?? "")._id,
    { imageUrl } = useSelector((state) => state.imageUpload);

  useEffect(() => {
    if (!localStorage.getItem("userInfo")) navigate("/");
  }, [navigate]);

  useEffect(() => {
    if (!imageUrl) return;
    axios
      .put("/update-pic", imageUrl)
      .then(() => {
        dispatch({ type: IMAGE_UPLOAD.NULL });
        navigate(`/profile/${loggedUserId}`);
      })
      .catch((error) => console.log(error));
  }, [dispatch, imageUrl, loggedUserId, navigate]);

  return (
    <div className="update-pic-container">
      <FileUploader
        handleChange={(file) => dispatch(imageUploader(file))}
        onDrop={(file) => dispatch(imageUploader(file))}
        name="photo"
        types={fileTypes}
      />
    </div>
  );
};

export default UpdatePic;
