import React, { useState } from "react";
import { FiMenu, FiUser, FiLogOut, FiCalendar, FiClipboard } from "react-icons/fi";
import { FaUsersCog } from "react-icons/fa";
import { MdOutlineMeetingRoom, MdOutlineRestaurantMenu, MdOutlineInventory } from "react-icons/md";
import { logout } from "../utils/auth";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";

const AdminLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div
                className={`${
                    isSidebarOpen ? "w-64" : "w-16"
                } fixed top-0 left-0 h-full bg-blue-800 text-white transition-all duration-300 flex flex-col z-10`}
            >
                {/* Logo */}
                <div className="flex items-center justify-center py-4 border-b border-blue-700 gap-8">
                    <h1 className={`${isSidebarOpen ? "text-xl text-white" : "hidden"} font-bold`}>
                        Bon Bon Hotel
                    </h1>
                    <FiMenu
                        className="text-2xl cursor-pointer"
                        onClick={toggleSidebar}
                    />
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col mt-4 space-y-2">
                    <Link to="/admin/event">
                        <div className="flex items-center px-4 py-2 hover:bg-blue-700 transition">
                            <FiCalendar className="text-xl" />
                            {isSidebarOpen && <span className="ml-3">Event Management</span>}
                        </div>
                    </Link>
                    <Link to="/admin/users">
                        <div className="flex items-center px-4 py-2 hover:bg-blue-700 transition">
                            <FaUsersCog className="text-xl" />
                            {isSidebarOpen && <span className="ml-3">User Management</span>}
                        </div>
                    </Link>
                    <Link to="/admin/rooms">
                        <div className="flex items-center px-4 py-2 hover:bg-blue-700 transition">
                            <MdOutlineMeetingRoom className="text-xl" />
                            {isSidebarOpen && <span className="ml-3">Room Management</span>}
                        </div>
                    </Link>
                    <Link to="/admin/menuItem">
                        <div className="flex items-center px-4 py-2 hover:bg-blue-700 transition">
                            <MdOutlineRestaurantMenu className="text-xl" />
                            {isSidebarOpen && <span className="ml-3">Menu Management</span>}
                        </div>
                    </Link>
                    <Link to="/admin/AllCategorys">
                        <div className="flex items-center px-4 py-2 hover:bg-blue-700 transition">
                            <MdOutlineInventory className="text-xl" />
                            {isSidebarOpen && <span className="ml-3">Inventory Management</span>}
                        </div>
                    </Link>
                </nav>
            </div>

            {/* Main Content */}
            <div
                className={`flex flex-col transition-all duration-300 ${
                    isSidebarOpen ? "ml-64" : "ml-16"
                } w-full`}
            >
                {/* Top Bar */}
                <div className={`bg-white shadow-md px-4 py-3 flex justify-between items-center fixed top-0 left-0 right-0 z-20 ${
                    isSidebarOpen ? "ml-64" : "ml-16"
                }`}>
                    <img src={logo} alt="Hotel Logo" className="h-10 w-10" />
                    <h2 className="text-xl font-semibold text-gray-700">Admin Dashboard</h2>
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
