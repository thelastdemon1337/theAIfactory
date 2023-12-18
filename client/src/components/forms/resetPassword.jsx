import React, { useState } from "react";
import * as Constants from "../../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [details, setDetails] = useState({
    email: "",
    password: "",
    confirmedPassowrd: "",
    otp: "",
  });
  const [otp, setOTP] = useState("");
  const naviage = useNavigate();

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };

  const handleSentOTP = async (e) => {
    e.preventDefault();
    try {
      if (!validateEmail(details.email)) {
        Constants.notifyError("Please enter valid email");
        return;
      }
      const response = await axios.post(
        Constants.apiGateway + "/users/reset-password",
        {
          email: details.email,
        }
      );
      if (response.status === 200) {
        const { message } = response.data;
        console.log(message);
        setShowPassword(true);
        setShowSubmitButton(true);
        Constants.notifySuccess(message);
      }
    } catch (error) {
      if (error.message === "Request failed with status code 404") {
        Constants.notifyError("User not found");
      }
      Constants.notifyError("Verification failed, please check");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (details.password === "" || details.confirmedPassowrd === "") {
        Constants.notifyError("All fields are required");
        return;
      }
      if (details.password !== details.confirmedPassowrd) {
        Constants.notifyError("Password does not match");
        return;
      }
      const response = await axios.post(
        Constants.apiGateway + "/users/otp/validate",
        {
          password: details.password,
          email: details.email,
          otp: details.otp,
        }
      );
      if (response.status === 200) {
        const { message } = response.data;
        naviage("/login");
        Constants.notifySuccess(message);
        console.log(message);
      }
    } catch (error) {
      Constants.notifyError("Verification failed");
      console.error(error);
    }
  };

  return (
    <div className="bg-black">
      <section className=" dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <span className="flex items-center mb-6 text-2xl font-semibold text-white dark:text-white">
            MetaMist
          </span>
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h2>
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={handleSubmit}
            >
              {!showPassword && (
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={details.email}
                    onChange={handleDetailsChange}
                    required={true}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                  />
                </div>
              )}

              {showPassword && (
                <div>
                  <div>
                    <label
                      for="otp"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      OTP
                    </label>
                    <input
                      className="w-full mb-2 h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-red-700"
                      type="password"
                      autoFocus={true}
                      // maxLength={}
                      name="otp"
                      id="otp"
                      required={true}
                      placeholder="****"
                      value={details.otp}
                      onChange={handleDetailsChange}
                    />
                  </div>

                  <div>
                    <label
                      for="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      onChange={handleDetailsChange}
                      value={details.password}
                      placeholder="••••••••"
                      className="w-full mb-2 h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-red-700"
                      required={true}
                    />
                  </div>
                  <div>
                    <label
                      for="confirm-password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm password
                    </label>
                    <input
                      type="password"
                      name="confirmedPassowrd"
                      id="confirmedPassowrd"
                      onChange={handleDetailsChange}
                      value={details.confirmedPassowrd}
                      placeholder="••••••••"
                      className="w-full mb-2 h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-red-700"
                      required={true}
                    />
                  </div>
                </div>
              )}

              {/* <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="newsletter" aria-describedb/y="newsletter" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="">
                  </div>
                  <div className="ml-3 text-sm">
                    <label for="newsletter" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                  </div>
              </div> */}

              {!showSubmitButton && (
                <div>
                  <button
                    type="button"
                    className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-red-700 border-none text-white text-sm shadow-sm"
                    onClick={handleSentOTP}
                  >
                    Sent OTP
                  </button>
                </div>
              )}
              {showSubmitButton && (
                <div>
                  <button
                    type="submit"
                    className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-red-700 border-none text-white text-sm shadow-sm"
                  >
                    Submit
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
