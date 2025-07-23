import React from "react";
import { FaBell, FaUserCircle, FaCog } from "react-icons/fa";
// import myLogo from '../assets/mylogo.jpg';

const TopNavBar = () => {
  return (
    <nav className="flex items-center justify-between bg-blue-600 shadow px-6 py-3 sticky top-0 z-50">
      {/* Left: Logo centered vertically */}
      <div className="flex-1" />
      {/* Right: Icons */}
      <div className="flex items-center space-x-6 text-white">
        <button
          aria-label="Notifications"
          className="relative hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white rounded"
        >
          <FaBell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5 leading-none">
            3
          </span>
        </button>
        <button
          aria-label="Settings"
          className="hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white rounded"
        >
          <FaCog size={20} />
        </button>
        <button
          aria-label="User Profile"
          className="hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white rounded"
        >
          <FaUserCircle size={26} />
        </button>
      </div>
    </nav>
  );
};

export default TopNavBar;
