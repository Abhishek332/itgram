import "./Authenticator.scss";
import { WelCome } from "../../assets/images";

const Authenticator = () => {
  return (
    <>
      <div className="authenticator-container">
        <div className="auth-box">
          <div className="form-box">
            <form>
              <label style={{ display: "flex", flexDirection: "column" }}>
                Name:
                <input type="text" name="name" />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
          <img src={WelCome} alt="" />
        </div>
      </div>
    </>
  );
};

export default Authenticator;
