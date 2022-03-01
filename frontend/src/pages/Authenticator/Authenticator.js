import "./Authenticator.scss";
import { WelCome } from "../../assets/images";

const Authenticator = () => {
  return (
    <>
      <div className="authenticator-container">
        <div className="auth-box">
          <div className="form-box">
            <label for="name">Name</label>
            <input type="text" placeholder="Enter your name" />
          </div>
          <div className="image-box">
            <img src={WelCome} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Authenticator;
