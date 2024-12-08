import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import logo from "../img/logo.png"; // Ensure you have your logo file in the correct path

const Footer = () => {
  return (
    <footer className="bg-white text-black shadow-lg py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {/* Logo and Contact Info */}
        <div className="text-left md:text-left">
          <img src={logo} alt="Hotel Logo" className="h-12" />
          <h4 className="text-lg font-semibold mt-4">Hotel Paradise</h4>
          <p className="mt-2">
            <span className="block">123 Paradise Street</span>
            <span className="block">Dream City, Country</span>
          </p>
          <p className="mt-2">
            <a href="tel:+123456789" className="hover:underline">
              Phone: +1 (234) 567-890
            </a>
          </p>
          <p className="mt-2">
            <a
              href="mailto:info@hotelparadise.com"
              className="hover:underline"
            >
              Email: info@hotelparadise.com
            </a>
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-left md:text-left">
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="/"
                className="hover:underline hover:text-gray-300 transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#events"
                className="hover:underline hover:text-gray-300 transition"
              >
                Events
              </a>
            </li>
            <li>
              <a
                href="#booking"
                className="hover:underline hover:text-gray-300 transition"
              >
                Booking
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="text-left">
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex justify-start space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-gray-300 text-xl transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-gray-300 text-xl transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-4">
        <p className="text-center text-sm">
          &copy; 2024 Hotel Paradise. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
