import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom"; // Ensure you're using react-router-dom
import logo from "../img/logo.png";
import user from "../img/profile.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef();

  // Check if the current route is /user/home
  const isHomePage = location.pathname === "/user/home";

  useEffect(() => {
    // Check if token exists in local storage to determine login state
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Scroll listener for changing header styles
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Close menu when clicking outside
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Header */}
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isHomePage
            ? isScrolled
              ? "bg-white shadow-lg text-gray-800"
              : "bg-transparent text-white"
            : isScrolled
            ? "bg-white shadow-lg text-gray-800"
            : "bg-white text-gray-800"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="Hotel Logo" className="h-10 w-10" />
            <span className="ml-2 font-bold text-xl">Bon Bon Hotel</span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6">
            <a href="#services" className="hover:underline">
              Services
            </a>

            <Link to='/user/booking'><a href="#booking" className="hover:underline">
              Booking
            </a>
            </Link>
            
            <a href="#events" className="hover:underline">
              Events
            </a>
          </nav>

          {/* Login/Profile */}
          <div className="relative" ref={menuRef}>
            {isLoggedIn ? (
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <img
                  src={user}
                  alt="Profile Icon"
                  className="h-10 w-10 rounded-full"
                />
                {menuOpen && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded py-2 w-48 text-gray-800">
                    <a
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </a>
                    <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        window.location.reload(); // Reload to update state
                      }}
                      className="w-full text-left block px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Login
              </a>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {/* Mobile Menu */}
          {menuOpen && (
            <div
              className={`absolute top-full left-0 w-full bg-white text-gray-800 shadow-lg py-4 flex flex-col md:hidden`}
            >
              <a href="#services" className="block px-6 py-2 hover:bg-gray-100">
                Services
              </a>
              <a href="#booking" className="block px-6 py-2 hover:bg-gray-100">
                Booking
              </a>
              <a href="#events" className="block px-6 py-2 hover:bg-gray-100">
                Events
              </a>
              {!isLoggedIn && (
                <a
                  href="/login"
                  className="block px-6 py-2 bg-blue-600 text-white text-center rounded hover:bg-blue-700"
                >
                  Login
                </a>
              )}
            </div>
          )}
        </div>
      </header>


      {!isHomePage&&<div className="pt-[100px]">

      </div>}
    </>
  );
};

export default Header;
