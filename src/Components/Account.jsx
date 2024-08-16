import { FaUser } from "react-icons/fa";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
export const UserDropdown = ({ user, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleProfileModal = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
    setIsOpen(false);
  };

  const renderDropdownContent = () => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10"
    >
      {user.email === "admin@gmail.com" && (
        <DropdownLink to="/admin">Admin Panel</DropdownLink>
      )}
      <DropdownItem onClick={toggleProfileModal}>View Profile</DropdownItem>
      <DropdownItem onClick={handleLogout}>
        <span className="text-red-500">Logout</span>
      </DropdownItem>
    </motion.div>
  );

  const renderProfileModal = () => (
    <Modal isOpen={isProfileModalOpen} onClose={toggleProfileModal}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          User Profile
        </h2>
        <button
          onClick={toggleProfileModal}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <FaTimes size={24} />
        </button>
      </div>
      <div className="space-y-4">
        <ProfileInfo label="Name" value={user.name} />
        <ProfileInfo label="Email" value={user.email} />
        {/* Add more user details here */}
      </div>
      <div className="mt-8">
        <button
          onClick={toggleProfileModal}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Close
        </button>
      </div>
    </Modal>
  );

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
          <FaUser className="text-gray-600" />
        </div>
        <span>{user.name}</span>
      </button>
      <AnimatePresence>{isOpen && renderDropdownContent()}</AnimatePresence>
      {renderProfileModal()}
    </div>
  );
};

const DropdownItem = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
  >
    {children}
  </button>
);

const DropdownLink = ({ to, children }) => (
  <Link
    to={to}
    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
  >
    {children}
  </Link>
);

const Modal = ({ isOpen, onClose, children }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full m-4"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const ProfileInfo = ({ label, value }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <p className="mt-1 text-sm text-gray-900 dark:text-white">{value}</p>
  </div>
);
