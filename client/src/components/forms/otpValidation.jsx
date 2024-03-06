import React, { useState } from "react";
import * as Constants from "../../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const config = {
  headers: {
    "ngrok-skip-browser-warning": true,
  },
};

const OTPValidation = ({ details }) => {
  const [otp, setOTP] = useState("");
  const naviage = useNavigate();

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        Constants.apiGateway + "/users/otp/validate",
        {
          email: details.email,
          otp: otp,
        },
        config
      );
      if (response.status === 200) {
        const { userId } = response.data;
        // naviage("/");
        window.location.href = "/";
        Constants.notifySuccess("SignUp successful");
        console.log(userId);
      }
    } catch (error) {
      Constants.notifyError("Verification failed");
      console.error(error);
    }
  };

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-black py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email {details.email}</p>
              </div>
            </div>

            <div>
              <form onSubmit={handleOTPSubmit}>
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-center mx-auto w-full max-w-xs">
                    <div className="w-64 h-16 ">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-red-700"
                        type="password"
                        autoFocus={true}
                        // maxLength={}
                        name="otp"
                        id="otp"
                        required={true}
                        placeholder="****"
                        value={otp}
                        onChange={(e) => setOTP(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-5">
                    <div>
                      <button
                        onClick={handleOTPSubmit}
                        className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-red-700 border-none text-white text-sm shadow-sm"
                      >
                        Verify Account
                      </button>
                    </div>

                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't recieve code?</p>{" "}
                      <a
                        className="flex flex-row items-center text-red-600"
                        href="http://"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Resend
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPValidation;
