import "./Loader.scss";

const Loader = ({ Illustration }) => {
  return (
    <div className="loader-container">
      <img src={Illustration} className="icon" alt="" />
    </div>
  );
};

export default Loader;
