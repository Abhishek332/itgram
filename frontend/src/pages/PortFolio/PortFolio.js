import "./PortFolio.scss";
import { ImLinkedin } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { ImGithub } from "react-icons/im";
import { BiShareAlt } from "react-icons/bi";
import { RiWhatsappLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { RiLinkedinBoxLine } from "react-icons/ri";

const PortFolio = () => {
  return (
    <div className="portfolio-container">
      <div className="sharer">
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${"https://thewonderlearn.com"}`}
        >
          <RiLinkedinBoxLine />
        </a>
        <a
          href="mailto:?subject=Portfolio of &amp;body=Good evening sir/ma'am. This is my portfolio please take a look on it."
          title="Share by Email"
        >
          <MdOutlineEmail />
        </a>

        <a href="https://api.whatsapp.com/send?text=https://thewonderlearn.com">
          <RiWhatsappLine />
        </a>
        <div style={{ cursor: "pointer" }}>
          <BiShareAlt />
        </div>
      </div>
      <div className="links">
        <a
          href={`https://api.whatsapp.com/WhatsAppNumber?text=${encodeURI(
            "This is my portfolio. Please take a look on it."
          )}`}
        >
          <ImGithub />
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
          <MdEmail />
        </a>
      </div>
      <img
        src="https://res.cloudinary.com/itgrampics/image/upload/v1648578715/ldnojqhypy8402gzig6h.jpg"
        alt=""
        className="user-image"
      />
      <div className="content">
        <h6>I'm</h6>
        <h1>Abhishek Porwal</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
          alias maiores veniam hic earum non at blanditiis amet saepe! Amet!
        </p>
        <a
          href={`https://api.whatsapp.com/WhatsAppNumber?text=${encodeURI(
            "This is my portfolio. Please take a look on it."
          )}`}
          className="button"
        >
          Contact Me
        </a>
      </div>
    </div>
  );
};

export default PortFolio;