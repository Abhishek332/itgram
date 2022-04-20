import "./PortFolio.scss";
import { ImLinkedin } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { ImGithub } from "react-icons/im";
import { BiShareAlt } from "react-icons/bi";
import { RiWhatsappLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { RiLinkedinBoxLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axios } from "../../api/axios";
import { Pavatar } from "../../assets/images";

const PortFolio = () => {
  const [data, setData] = useState(),
    { userId } = useParams();

  useEffect(() => {
    axios
      .get(`/get-portfolio/${userId}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [userId]);

  return (
    <div className="portfolio-container">
      <div className="sharer">
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
        >
          <RiLinkedinBoxLine />
        </a>
        <a
          href={`mailto:?subject=Portfolio of ${data?.name}&amp;body=Good evening sir/ma'am. This is my portfolio please take a look on it.`}
          title="Share by Email"
        >
          <MdOutlineEmail />
        </a>

        <a
          href={`https://api.whatsapp.com/send?text=${window.location.href}`}
          data-action="share/whatsapp/share"
        >
          <RiWhatsappLine />
        </a>
        <div style={{ cursor: "pointer" }}>
          <BiShareAlt />
        </div>
      </div>
      {data && (
        <>
          <div className="links">
            <a href={data.github}>
              <ImGithub />
            </a>
            <a href={data.linkedin}>
              <ImLinkedin />
            </a>
            <a href={`mailto:${data.email}`}>
              <MdEmail />
            </a>
          </div>
          <img src={data.profilePic || Pavatar} alt="" className="user-image" />
          <div className="content">
            <h6>I'm</h6>
            <h1>{data.name}</h1>
            <p>{data.about}</p>
            <a
              href={`https://api.whatsapp.com/+91${
                data.whatsapp
              }?text=${encodeURI(
                `Hy ${data.name} I just come to your portfolio. Your profile is quite interesting. Can we have a chat.`
              )}`}
              className="button"
            >
              Contact Me
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default PortFolio;
