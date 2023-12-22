import { toast } from "react-toastify";

export const apiGateway = "http://localhost:3500"
// export const apiGateway = "https://855e-49-249-163-201.ngrok-free.app";
export const config = {
  headers: {
    "ngrok-skip-browser-warning": true,
  },
};
export const PROJECT_ID = "321dm2om";
export const DATASET = "production";

export const notifySuccess = (message) =>
  toast.success(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

export const notifyInfo = (message) =>
  toast.info(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

export const notifyError = (message) =>
  toast.error(message, {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
