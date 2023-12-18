import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { auth } from "../firebase/firebase";
import axios from "axios";
import * as Constants from "../utils/constants";

export const userContext = createContext({
  currentUser: null,
  logIn: () => {},
  logOut: () => {},
  updateUser: () => {},
});

const USER = {
  email: "",
  age: "",
  fullname: "",
  role: "",
  registration_date: "",
  _id: "",
  accessToken: "",
};

export function UserContextProvider({ children }) {
  const storedUser = JSON.parse(localStorage.getItem("currentUser")) || USER;
  const [currentUser, setCurrentUser] = useState(storedUser);

  function logIn(newUser) {
    setCurrentUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
  }

  const logOut = () => {
    setCurrentUser(USER);
    localStorage.clear();
    return auth.signOut();
  };

  const updateUser = useCallback(
    (updatedUser) => {
      setCurrentUser((prevUser) => ({ ...prevUser, ...updatedUser }));
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...currentUser, ...updatedUser })
      );
    },
    [currentUser]
  );

  const isAgeProvided = currentUser.age !== "";

  const getUserDetails = async (email,accessToken) => {
    try {
      console.log(currentUser);
      console.log(email)
      const response = await axios.get(Constants.apiGateway + "/users/user", {
        params: {
          email: email,
        },
        // headers:{
        //   "auth-token": accessToken
        // }
      });
      const userData = response.data[0];
      console.log(userData)
      updateUser(userData);
      console.log(currentUser);
      console.log();
      return
    } catch (error) {
      console.log(error);
      return error
    }
  };



  const values = {
    currentUser,
    logIn,
    logOut,
    updateUser,
    isAgeProvided,
    getUserDetails
  };

  return <userContext.Provider value={values}>{children}</userContext.Provider>;
}

export function useUserContext() {
  return useContext(userContext);
}
