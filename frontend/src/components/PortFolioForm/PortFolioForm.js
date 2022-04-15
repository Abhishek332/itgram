import { PopupGenerator } from "../";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axios } from "../../api/axios";
import { useToaster, ToastBox } from "../../utils/toaster";

const PortFolioForm = ({ source }) => {
  const [showForm, setShowForm] = useState(source === "signup"),
    toaster = useToaster(),
    navigate = useNavigate(),
    [portfolio, setPortfolio] = useState({
      about: "",
      whatsapp: "",
      github: "",
      linkedin: "",
    });

  const handlePortFolioChange = ({ target: { name, value } }) => {
      setPortfolio({ ...portfolio, [name]: value });
    },
    handlePortFolioSubmit = () => {
      axios
        .post("/create-portfolio", portfolio)
        .then(({ data: { message, userId } }) => {
          toaster("success", message);
          navigate(`/portfolio/${userId}`);
        })
        .catch((err) => console.log(err));
    };

  return (
    <div>
      {showForm && (
        <PopupGenerator popupCloser={setShowForm}>
          <div className="form-box" style={{ marginRight: 0 }}>
            <h2>Create your Portfolio</h2>
            <textarea
              name="about"
              placeholder="Tell about yourself*"
              value={portfolio.about}
              onChange={handlePortFolioChange}
              required
            />
            <input
              type="text"
              name="whatsapp"
              placeholder="Enter your whatsapp no*"
              value={portfolio.whatsapp}
              onChange={handlePortFolioChange}
              required
            />
            <input
              type="text"
              name="github"
              placeholder="Enter your github url*"
              value={portfolio.github}
              onChange={handlePortFolioChange}
              required
            />
            <input
              type="text"
              name="linkedin"
              placeholder="Enter your LinkedIn url*"
              value={portfolio.linkedin}
              onChange={handlePortFolioChange}
              required
            />
            <button onClick={handlePortFolioSubmit}>Submit</button>
          </div>
        </PopupGenerator>
      )}
      <ToastBox />
    </div>
  );
};

export default PortFolioForm;
