import React, { useState } from "react";
import {
  FiMenu,
  FiUser,
  FiLogOut,
  FiCalendar,
  FiClipboard,
} from "react-icons/fi";
import { FaUsersCog } from "react-icons/fa";
import {
  MdOutlineMeetingRoom,
  MdOutlineRestaurantMenu,
  MdOutlineInventory,
} from "react-icons/md";
import { logout } from "../utils/auth";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import { FaPeopleGroup, FaArrowsDownToPeople } from "react-icons/fa6";
import {getUserRole} from "../utils/auth";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const userRole = getUserRole();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

  // Define navigation links based on user role
  const navigationLinks = {
    admin: [
      { to: "/admin/users", icon: <FaUsersCog className="text-xl" />, label: "User Management" },
      { to: "/admin/event", icon: <FiCalendar className="text-xl" />, label: "Event Management" },
      { to: "/admin/rooms", icon: <MdOutlineMeetingRoom className="text-xl" />, label: "Room Management" },
      { to: "/admin/menuItem", icon: <MdOutlineRestaurantMenu className="text-xl" />, label: "Menu Management" },
      { to: "/admin/AllCategorys", icon: <MdOutlineInventory className="text-xl" />, label: "Inventory Management" },
      { to: "/admin/employees", icon: <FaPeopleGroup className="text-xl" />, label: "Employee Management" },
      { to: "/admin/roles", icon: <FaArrowsDownToPeople className="text-xl" />, label: "Position Management" }
    ],
    'event-manager': [
      { to: "/admin/users", icon: <FaUsersCog className="text-xl" />, label: "User Management" },
      { to: "/admin/event", icon: <FiCalendar className="text-xl" />, label: "Event Management" }
    ],
    'inventory-manager': [
      { to: "/admin/users", icon: <FaUsersCog className="text-xl" />, label: "User Management" },
      { to: "/admin/AllCategorys", icon: <MdOutlineInventory className="text-xl" />, label: "Inventory Management" }
    ],
    'booking-manager': [
      { to: "/admin/users", icon: <FaUsersCog className="text-xl" />, label: "User Management" },
      { to: "/admin/rooms", icon: <MdOutlineMeetingRoom className="text-xl" />, label: "Room Management" },
      { to: "/admin/menuItem", icon: <MdOutlineRestaurantMenu className="text-xl" />, label: "Menu Management" }
    ],
    'hr-manager': [
      { to: "/admin/users", icon: <FaUsersCog className="text-xl" />, label: "User Management" },
      { to: "/admin/employees", icon: <FaPeopleGroup className="text-xl" />, label: "Employee Management" },
      { to: "/admin/roles", icon: <FaArrowsDownToPeople className="text-xl" />, label: "Position Management" }
    ]
  };

  return (
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div
            className={`${
                isSidebarOpen ? "w-64" : "w-16"
            } fixed top-0 left-0 h-full bg-gray-900 text-white transition-all duration-300 flex flex-col z-10`}
        >
          {/* Logo */}
          <div className="flex items-center justify-center py-4 border-b border-black gap-8">
            <h1
                className={`${
                    isSidebarOpen ? "text-xl text-white" : "hidden"
                } font-bold`}
            >
              Bon Bon Hotel
            </h1>
            <FiMenu className="text-2xl cursor-pointer" onClick={toggleSidebar} />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col mt-4 space-y-2">
            {navigationLinks[userRole]?.map((link) => (
                <Link key={link.to} to={link.to}>
                  <div className="flex items-center px-4 py-2 hover:bg-blue-700 transition">
                    {link.icon}
                    {isSidebarOpen && <span className="ml-3">{link.label}</span>}
                  </div>
                </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div
            className={`flex flex-col transition-all duration-300 ${
                isSidebarOpen ? "ml-64" : "ml-16"
            } w-full`}
        >
          {/* Top Bar */}
          <div
              className={`bg-white shadow-md px-4 py-3 flex justify-between items-center fixed top-0 left-0 right-0 z-20 ${
                  isSidebarOpen ? "ml-64" : "ml-16"
              }`}
          >
            <img src={logo} alt="Hotel Logo" className="h-10 w-10" />
            <h2 className="text-xl font-semibold text-gray-700">
              Admin Dashboard
            </h2>
            {/* Profile Icon */}
            <div className="relative">
              <button
                  className="flex items-center space-x-2"
                  onClick={toggleProfileMenu}
              >
                <FiUser className="text-2xl" />
              </button>

              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-md border">
                    <Link to="/admin/profile">
                      <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Profile
                      </div>
                    </Link>
                    <div
                        onClick={logout}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </div>
                  </div>
              )}
            </div>
          </div>

          {/* Page Content */}
          <div className="flex-1 p-6 mt-16 overflow-y-auto">{children}</div>
        </div>
      </div>
  );
};

export default AdminLayout;
