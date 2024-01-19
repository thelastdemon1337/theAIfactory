import React, { useState, useEffect } from "react";
import { useUserContext } from "../../context/userContext";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import * as Constants from "../../utils/constants";

const AgeInputForm = () => {
  const { updateUser, currentUser, getUserDetails } = useUserContext();
  const naviage = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  const [email, setEmail] = useState("");
  const [user, setUser] = useState({
    email: currentUser?.email,
    fullname: currentUser?.fullname,
    age: currentUser?.age,
  });

  function onCloseModal() {
    setOpenModal(false);
    setEmail("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.removeItem("googleLoggedIn");

    if (user?.age && !isNaN(user.age) && user.age > 13) {
      updateUser(user);
      try {
        const response = await axios.post(Constants.apiGateway + "/users", {
          email: user.email,
          password: user.fullname,
          fullname: user.fullname,
          age: user.age,
        });
        const accessToken = response.data.accessToken;

        await getUserDetails(user.email, accessToken);
        // updateUser(user);
        console.log(currentUser);
        console.log("Response:", response.data);
        Constants.notifySuccess("Signup Successfully");
      } catch (error) {
        if (error.message === "Request failed with status code 409") {
          Constants.notifyError("User alredy exists");
          naviage("/login");
        } else {
          Constants.notifyError("Error");
          naviage("/login");
          console.error(error);
        }
      }
      // Constants.notifySuccess("Please enter a valid data.")
      setOpenModal(false);
    } else {
      // alert("Please enter a valid age.");
      Constants.notifyError("Please enter a valid data.");
    }
  };

  const handleUserDetailsChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Complete your profile
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="Fullname" />
              </div>
              <TextInput
                id="fullname"
                name="fullname"
                placeholder="Fullname"
                value={user.fullname}
                onChange={handleUserDetailsChange}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                placeholder="Email"
                value={user.email}
                onChange={handleUserDetailsChange}
                name="email"
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="Age" />
                <i className="text-sm p-2">*min age required 13</i>
              </div>

              <TextInput
                className={parseInt(user.age, 10) < 13 ? "text-red-500" : ""}
                id="age"
                name="age"
                placeholder="Age"
                value={user.age}
                onChange={handleUserDetailsChange}
                required
              />
            </div>
            <div className="w-full">
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AgeInputForm;
