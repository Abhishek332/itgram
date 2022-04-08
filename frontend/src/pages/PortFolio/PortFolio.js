import "./PortFolio.scss";
import { ImLinkedin } from "react-icons/im";
import { IoLogoWhatsapp } from "react-icons/io";
import { ImGithub } from "react-icons/im";

const PortFolio = () => {
  return (
    <div className="portfolio-container">
      <div className="bottom">
        <a
          href={`https://wa.me/WhatsAppNumber?text=${encodeURI(
            "Text to send."
          )}`}
        >
          <IoLogoWhatsapp />
        </a>
        <a
          href={`https://wa.me/WhatsAppNumber?text=${encodeURI(
            "Text to send."
          )}`}
        >
          <ImLinkedin />
        </a>
        <a
          href={`https://wa.me/WhatsAppNumber?text=${encodeURI(
            "Text to send."
          )}`}
        >
          <ImGithub />
        </a>
      </div>
      <img
        src="https://res.cloudinary.com/itgrampics/image/upload/v1648578715/ldnojqhypy8402gzig6h.jpg"
        alt=""
        className="user-image"
      />
    </div>
  );
};

export default PortFolio;
