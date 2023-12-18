import React, { useState } from "react";
import * as Constants from "../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { signInWithGooglePopup } from "../firebase/firebase";
import OTPValidation from "../components/forms/otpValidation";

const config = {
  headers: {
    "ngrok-skip-browser-warning": true
  }
}

const Signup = () => {
  const { updateUser, currentUser } = useUserContext();
  const naviage = useNavigate();
  const [showOTP, setshowOTP] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    age: "",
    fullname: "",
  });

  const handleUserDetailsChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    if (user.age && !isNaN(user.age) && user.age > 13) {
      try {
        const response = await axios.post(Constants.apiGateway + "/users", {
          email: user.email,
          password: user.password,
          fullname: user.fullname,
          age: user.age,
        }, config);
        updateUser(user);
        console.log(currentUser);
        console.log("Response:", response.data);
        localStorage.setItem("justSignedUp", "true");
        // naviage("/");
        setshowOTP(true);
        Constants.notifyInfo("Verification email sent");
      } catch (error) {
        if (error.message === "Request failed with status code 409") {
          Constants.notifyError("User alredy exists");
        } else {
          Constants.notifyError("SignUp failed");
          console.error(error);
        }
      }
    } else {
      Constants.notifyError("Minimum age required is 13");
    }
  };

  const handleNavigateToLogin = () => {
    naviage("/login");
  };

  return (
    <>
      {showOTP && <OTPValidation details={user} />}
      {!showOTP && (
        <>
          {" "}
          <section
            style={{ backgroundColor: "black" }}
            className="bg-gray-50 min-h-screen flex items-center justify-center"
          >
            <div
              style={{ backgroundColor: "black" }}
              className="bg-gray-100 flex rounded-2xl shadow-lg max-w-5xl p-5 items-center"
            >
              <div className="md:block hidden w-1/2">
                <h2 className="font-bold text-start mb-8 text-2xl text-white">
                TheAIFactory
                </h2>

                <img
                  className="rounded-2xl"
                  alt="signup-metamist"
                  src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
                />
              </div>
              <div className="md:w-1/2 px-8 md:px-16 text-start">
                <h2 className="font-bold  text-2xl text-white">SignUp</h2>
                <p className="text-xs mt-4 text-white">Welcome to TheAIFactory</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    className="p-2 mt-8 rounded-xl border"
                    type="text"
                    name="fullname"
                    placeholder="Fullname"
                    value={user.fullname}
                    onChange={handleUserDetailsChange}
                    required={true}
                  />
                  <div className="relative">
                    <input
                      className="p-2 rounded-xl border w-full"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={user.email}
                      onChange={handleUserDetailsChange}
                      required={true}
                    />
                  </div>
                  <div className="relative">
                    <input
                      className="p-2 rounded-xl border w-full"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={user.password}
                      onChange={handleUserDetailsChange}
                      required={true}
                    />
                  </div>

                  <div className="relative">
                    <input
                      className="p-2 rounded-xl border w-full"
                      type="number"
                      name="age"
                      placeholder="Age"
                      value={user.age}
                      onChange={handleUserDetailsChange}
                      required={true}
                    />
                  </div>

                  <button
                    style={{ backgroundColor: "red" }}
                    className="bg-red rounded-xl text-white py-2 hover:scale-105 duration-300"
                  >
                    SignUp
                  </button>
                </form>

                <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                  <hr className="border-gray-400" />
                  <p className="text-center text-sm">OR</p>
                  <hr className="border-gray-400" />
                </div>

                <button
                  style={{ backgroundColor: "red" }}
                  onClick={signInWithGoogle}
                  className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-white"
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

                {/* <div className="mt-5 text-xs border-b border-red py-4 text-white">
                  <a href="/">Forgot your password?</a>
                </div> */}

                <div className="mt-3 text-xs flex justify-between items-center text-white">
                  <p>Already have an account?</p>
                  <button
                    onClick={handleNavigateToLogin}
                    style={{ backgroundColor: "red" }}
                    className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Signup;
