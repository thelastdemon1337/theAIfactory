import React from "react";

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import ResetPassword from "./components/forms/resetPassword";

import NewsLetter from "./components/forms/newsLetter";

import Home from "./pages/home";
import Discover from "./pages/discover";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Profile from "./pages/profile";
import ComingSoon from "./components/comingSoon";

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        {/* Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ai-tools" element={<ComingSoon />} />
        <Route path="/family" element={<ComingSoon />} />
        <Route path="/pricing" element={<ComingSoon />} />

        <Route path="/reset-password" element={<ResetPassword />} />

        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
      {/* <Footer/> */}
      <NewsLetter/>
    </div>
  );
};

export default App;
