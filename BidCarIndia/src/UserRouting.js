import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import FrontPage from "./userside/frontpage/FrontPage";
import Login from "./userside/loginpage/Login";
import { Route, Routes } from "react-router-dom";
import VehicleDetailPage from "./userside/vehicledeailpage/VehicleDetailPage";
import RegistrationPage from "./userside/registrationpage/RegistrationPage";
import UserProfile from "./userside/userProfile/UserProfile";
import Footer from "./userside/footer/Footer";
import YourBid from "./userside/yourBid/YourBid";
import About from "./userside/header/About";
import Contact from "./userside/header/Contact";
import Service from "./userside/header/Service";
import { MainHeader } from "./userside/header/MainHeader";
import { FaWhatsapp, FaArrowUp } from "react-icons/fa";

const AppLayout = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Function to toggle scroll-to-top visibility
  const toggleScrollToTopVisibility = () => {
    if (window.scrollY > 500) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Add event listener for scroll
  useEffect(() => {
    window.addEventListener("scroll", toggleScrollToTopVisibility);
    return () => {
      window.removeEventListener("scroll", toggleScrollToTopVisibility);
    };
  }, []);

  return (
    <div className="">
      <MainHeader />
      <Outlet />
      <Footer />

      {/* Floating Buttons */}
      <div className="fixed bottom-2 right-2 flex flex-col space-y-4">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/9953098590"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 md:p-4 xs:p-2 rounded-full text-white shadow-lg hover:bg-green-600 transition-transform transform hover:scale-110"
        >
          <FaWhatsapp size={24} />
        </a>

        {/* Scroll-to-Top Button */}
        {showScrollToTop && (
          <button
            onClick={scrollToTop}
            className="bg-red-500 md:p-4 xs:p-2 rounded-full text-white shadow-lg hover:bg-red-600 transition-transform transform hover:scale-110"
          >
            <FaArrowUp size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

function UserRouting() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<FrontPage />} />
        <Route path="about" element={<About />} />
        <Route path="service" element={<Service />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="detail/:id" element={<VehicleDetailPage />} />
        <Route path="signup" element={<RegistrationPage />} />
        <Route path="userdetail" element={<UserProfile />} />
        <Route path="yourbid" element={<YourBid />} />
      </Route>
    </Routes>
  );
}

export default UserRouting;