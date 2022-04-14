import { PopupGenerator } from "../";
import { useState } from "react";

const PortFolioForm = ({ source }) => {
  const [showForm, setShowForm] = useState(source === "signup"),
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
      console.log("Portfolio", portfolio);
      // dispatch(portfolioCreate(state));
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
    </div>
  );
};

export default PortFolioForm;
