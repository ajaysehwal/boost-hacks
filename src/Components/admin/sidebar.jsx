import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaLaptopCode,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
const sidebarItems = [
  { icon: FaCalendarAlt, text: "Events", id: "events" },
  { icon: FaLaptopCode, text: "Bootcamps", id: "bootcamps" },
  { icon: FaFileAlt, text: "Documents", id: "documents" },
  { icon: FaCog, text: "Settings", id: "settings" },
];

export const Sidebar = ({
  isOpen,
  toggleSidebar,
  setActiveSection,
  activeSection,
}) => (
  <motion.div
    initial={{ x: "-100%" }}
    animate={{ x: 0 }}
    transition={{ duration: 0.3 }}
    className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-br from-blue-800 to-indigo-900 text-white p-5 z-20 shadow-lg ${
      isOpen ? "block" : "hidden lg:block"
    }`}
  >
    <div className="flex justify-between items-center mb-10">
      <h2 className="text-2xl font-bold">Boost Guide <span className="text-sm text-yellow-300">Admin</span></h2>
      <button onClick={toggleSidebar} className="lg:hidden text-white">
        <FaBars size={24} />
      </button>
    </div>
    <nav>
      <ul className="space-y-4">
        {sidebarItems.map((item) => (
          <motion.li
            key={item.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center space-x-3 w-full p-3 rounded-lg transition duration-200 ${
                activeSection === item.id ? "bg-blue-700" : "hover:bg-blue-700"
              }`}
            >
              <item.icon size={20} />
              <span>{item.text}</span>
            </button>
          </motion.li>
        ))}
      </ul>
    </nav>
    <motion.a
      className="absolute bottom-5 left-5 right-5"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      href="/"
    >
      <button className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-green-600 transition duration-200">
        <FaSignOutAlt size={20} />
        <span>Home</span>
      </button>
    </motion.a>
  </motion.div>
);
