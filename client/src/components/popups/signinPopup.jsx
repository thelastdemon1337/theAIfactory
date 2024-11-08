import { Button, Modal, Select } from "flowbite-react";
import { useState } from "react";
import { BsFillBookmarkFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Constants from "../../utils/constants"
import { signInWithGooglePopup } from "../../firebase/firebase";
import { useUserContext } from "../../context/userContext";

const SigninPopup = ({setShowModal}) => {
  const { updateUser } = useUserContext();
  const naviage = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [openModal, setOpenModal] = useState(true);
  const signInWithGoogle = async () => {
    try {
      const verifiedUser = await signInWithGooglePopup();
      console.log("SignUp complete");
      console.log(verifiedUser.user);
      const { email, displayName, accessToken } = verifiedUser.user;
      console.log(email, displayName);
      updateUser({ email: email, fullname: displayName });
      // await getUserDetails(email, accessToken);
      localStorage.setItem("googleLoggedIn", "true");
      naviage("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Constants.notifyError("Cannot create user, email already in use");
      } else {
        Constants.notifyError("user creation encountered an error");
        console.log(error);
      }
    }
  };

  return (
    <>
      <Modal
        show={openModal}
        position='center'
        onClose={() => setShowModal(false)}
        popup
      >
        <Modal.Header style={{ backgroundColor: "black" }} />

        <Modal.Body style={{ backgroundColor: "black" }}>
          <div className="text-center">
            <BsFillBookmarkFill className="mx-auto mb-4 h-14 w-14 text-white dark:text-white" />
            <h3 className="mb-5 text-lg font-normal text-white dark:text-white">
              Sign up to Favorite
            </h3>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-white dark:text-white">
                Join our community of 175000 proactive proffesionals adopting AI
                tools in there work
              </p>
              <p className="text-base leading-relaxed text-white dark:text-white">
                <i>
                  You'll also recieve our free weekly newsletter that includes
                  new tools, helpful tutorials and exclusive deals.
                </i>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              style={{ backgroundColor: "red" }}
                onClick={signInWithGoogle}
              className="bg-white border py-2 w-64 rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-white"
            >
              <svg
                className="mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="25px"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              Continue with Google
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SigninPopup;
