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

const config = {
  headers: {
    "ngrok-skip-browser-warning": true,
  },
};

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
  tokens: "",
  favouriteTools: [],
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
    async (updatedUser) => {
      try {
        console.log(currentUser);
        setCurrentUser((prevUser) => ({ ...prevUser, ...updatedUser }));
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ ...currentUser, ...updatedUser })
        );
        const response = await axios.patch(
          Constants.apiGateway + "/users/",
          {

              id: currentUser._id,
              email: currentUser.email,
              fullname: currentUser.fullname,
              favouriteTools: currentUser.favouriteTools,
              age: currentUser.age,
              tokens : currentUser.tokens 
          },
          {
            headers: {
              "ngrok-skip-browser-warning": true,
            },
          }
        );

        const userData = response.data[0];
        console.log("User updated on both frontend and backend:", userData);
      } catch (error) {
        console.log("Error updating user:", error);
        // Handle the error, e.g., show a notification to the user
      }
    },
    [currentUser]
  );

  // const updateUser = useCallback(
  //   (updatedUser) => {
  //     setCurrentUser((prevUser) => ({ ...prevUser, ...updatedUser }));
  //     localStorage.setItem(
  //       "currentUser",
  //       JSON.stringify({ ...currentUser, ...updatedUser })
  //     );
  //   },
  //   [currentUser]
  // );

  const isAgeProvided = currentUser.age !== "";

  const getUserDetails = async (email, accessToken) => {
    try {
      console.log(currentUser);
      console.log(email);
      const response = await axios.get(Constants.apiGateway + "/users/user", {
        params: {
          email: email,
        },
        headers: {
          "auth-token": accessToken,
          "ngrok-skip-browser-warning": true,
        },
      });
      const userData = response.data[0];
      console.log(userData);
      updateUser(userData);
      console.log(currentUser);
      console.log();
      return;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const updateUserDetails = async (user) => {
    try {
      console.log(currentUser);
      console.log(user);
      const response = await axios.patch(Constants.apiGateway + "/users", {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
        favouriteTools: user.favouriteTools,
        age: user.age,
        token: user.tokens,

        headers: {
          // "auth-token": accessToken,
          "ngrok-skip-browser-warning": true,
        },
      });
      const userData = response.data[0];
      console.log(userData);
      updateUser(userData);
      console.log(currentUser);
      console.log();
      return;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const values = {
    currentUser,
    logIn,
    logOut,
    updateUser,
    isAgeProvided,
    getUserDetails,
    updateUserDetails,
  };

  return <userContext.Provider value={values}>{children}</userContext.Provider>;
}

export function useUserContext() {
  return useContext(userContext);
}
