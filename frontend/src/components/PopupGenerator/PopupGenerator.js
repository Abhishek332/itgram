import "./PopupGenerator.scss";

const PopupGenerator = ({ children, popupCloser }) => {
  return (
    <div className="popup-container">
      <div className="popup-closer" onClick={() => popupCloser(false)}></div>
      <div className="popup">{children}</div>
    </div>
  );
};

export default PopupGenerator;
