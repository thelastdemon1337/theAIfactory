import React, { useEffect, useState } from "react";

import { getAitools } from "./utils/sanity";

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import ResetPassword from "./components/forms/resetPassword";

import NewsLetter from "./components/forms/newsLetter";
import NewsCard from "./components/cards/newsCard";
import AIToolsCard from "./components/cards/aiToolsCard";
import Chat from "./components/chat/chat";

import Home from "./pages/home";
import Discover from "./pages/discover";
import AITools from "./pages/aiTools";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Profile from "./pages/profile";
// import PaymentScreen from "./pages/payment";
import CustomerSupport from "./pages/customerSupport";

import ComingSoon from "./components/comingSoon";

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAitools();
        if (response.length > 0) {
          setData(response);
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
        <Route path="/customer-support" element={<CustomerSupport />} />

        <Route path="/discover/news" element={<NewsCard />} />
        <Route path="/discover/aitools" element={<AIToolsCard query={""} data={data} />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/ai-tools" element={<AITools />} />
        <Route path="/ai-tools/chatgpt" element={<Chat/>} />

        <Route path="/family" element={<ComingSoon />} />
        <Route path="/pricing" element={<ComingSoon />} />
        {/* <Route path="/payments" element={<PaymentScreen />} /> */}

        <Route path="/reset-password" element={<ResetPassword />} />

        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
      {/* <Footer/> */}
      <NewsLetter />
    </div>
  );
};

export default App;
