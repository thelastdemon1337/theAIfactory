import React, { useState } from "react";
import axios from "axios";
import * as Constants from "../utils/constants";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      Constants.notifyInfo("Please fill in all fields");
      return;
    }

    console.log(formData);

    try {
      const response = await axios.post(Constants.apiGateway + "/contact-us", {
        from: formData.email,
        subject: formData.subject,
        body: formData.message,
        name: formData.name,
      });
      if (response.status === 200) {
        Constants.notifySuccess("Email sent successfully");
      }
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="m-6 lg:m-12">
      <div className="flex justify-center items-center  bg-gray-900 rounded-xl">
        <div className="mx-auto my-4 px-4 lg:px-20">
          <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
            <div className="flex">
              <h1 className="font-bold uppercase text-gray-300 text-4xl">
                Send us a message
              </h1>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
              <input
                className="w-full bg-gray-100 text-gray-950 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                name="name"
                value={formData.name}
                placeholder="First Name*"
                onChange={handleInputChange}
                required
              />
              <input
                className="w-full bg-gray-100 text-gray-950 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email*"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="my-4">
              <input
                name="subject"
                value={formData.subject}
                placeholder="Subject*"
                onChange={handleInputChange}
                required
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              ></input>
            </div>
            <div className="my-4">
              <textarea
                name="message"
                value={formData.message}
                placeholder="Message*"
                onChange={handleInputChange}
                required
                className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>
            <div className="my-2 w-1/2 lg:w-1/4">
              <button
                onClick={handleSubmit}
                className="uppercase text-sm font-bold tracking-wide bg-red-500 hover:bg-red-700 text-gray-100 p-3 rounded-lg w-full 
                      focus:outline-none focus:shadow-outline"
              >
                Send Message
              </button>
            </div>
          </div>

          <div className="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-gray-950 rounded-2xl">
            <div className="flex flex-col text-white">
              <h1 className="font-bold uppercase text-4xl my-4">Connect With Us Today!</h1>
              <p className="text-gray-400 text-xl">
                We'd love to hear from you! Reach out to us with any questions,
                feedback, or inquiries. Our team is here to assist you in any
                way we can. Connect with us using the form below.
              </p>

              <div className="flex my-4 w-2/3 lg:w-1/2">
                <div className="flex flex-col">
                  <i className="fas fa-envelope pt-2 pr-2" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-2xl">Email</h2>
                  <p className="text-gray-400">contact@theaifactory.in</p>
                </div>
              </div>

              <div className="flex my-4 w-2/3 lg:w-1/2">
                <div className="flex flex-col">
                  <i className="fas fa-map-marker-alt pt-2 pr-2" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-2xl">Main Office</h2>
                  <p className="text-gray-400">Hyderabad, Telangana</p>
                </div>
              </div>

              <div className="flex my-4 w-2/3 lg:w-1/2">
                <div className="flex flex-col">
                  <i className="fas fa-phone-alt pt-2 pr-2" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-2xl">Call Us</h2>
                  <p className="text-gray-400">9346089972</p>
                </div>
              </div>

              {/* <div className="flex my-4 w-2/3 lg:w-1/2">
                <a
                  href="https://www.facebook.com/ENLIGHTENEERING/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1"
                >
                  <i className="fab fa-facebook-f text-blue-900" />
                </a>
                <a
                  href="https://www.linkedin.com/company/enlighteneering-inc-"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1"
                >
                  <i className="fab fa-linkedin-in text-blue-900" />
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
