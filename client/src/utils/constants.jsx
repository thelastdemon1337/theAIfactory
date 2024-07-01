import { toast } from "react-toastify";

// export const apiGateway = "http://localhost:3500"
export const apiGateway = "https://59e8-49-249-163-201.ngrok-free.app";
export const stripe_public_key = "pk_test_51N93OHSCV1izsGnxehWkJ7dPM0GFG0vPv3DlGcp9c3AYSIDQW10Tl1DhaLNDmc4oMshVyOIXFXzZFqhkkyi6n4EN00GnDttkSH"

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
