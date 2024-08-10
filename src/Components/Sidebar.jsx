import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className="flex items-center p-4 bg-gray-800 text-white">
                <button onClick={toggleSidebar}>
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>
            <div className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-40 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-6">
                    <h2 className="text-2xl font-bold mb-6">Sidebar</h2>
                    <nav>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/" onClick={closeSidebar} className="block py-2 px-4 rounded hover:bg-gray-700">Home</Link>
                            </li>
                            <li>
                                <Link to="/LMS" onClick={closeSidebar} className="block py-2 px-4 rounded hover:bg-gray-700">LMS</Link>
                            </li>
                            <li>
                                <Link to="/Meeting" onClick={closeSidebar} className="block py-2 px-4 rounded hover:bg-gray-700">Meeting</Link>
                            </li>
                            <li>
                                <Link to="/Community" onClick={closeSidebar} className="block py-2 px-4 rounded hover:bg-gray-700">Community</Link>
                            </li>
                            <li>
                                <Link to="/Dropbox" onClick={closeSidebar} className="block py-2 px-4 rounded hover:bg-gray-700">Dropbox</Link>
                            </li>
                            <li>
                                <Link to="/TechNews" onClick={closeSidebar} className="block py-2 px-4 rounded hover:bg-gray-700">TechNews</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
