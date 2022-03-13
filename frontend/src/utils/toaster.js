import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useToaster = () => {
  return (type, message) => {
    if (type === "success") {
      toast.success(message, {
        position: "bottom-center",
        autoClose: 2000,
      });
      return;
    }
    toast.error(message, {
      position: "bottom-center",
      autoClose: 2000,
    });
  };
};

export const ToastBox = () => {
  return <ToastContainer />;
};
