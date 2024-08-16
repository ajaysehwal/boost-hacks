import { FaBars } from "react-icons/fa";
export const Header = ({ toggleSidebar, activeSection }) => (
  <header className="bg-white shadow-md p-4 sticky top-0 z-10">
    <div className="flex justify-between items-center">
      <button onClick={toggleSidebar} className="lg:hidden text-blue-800">
        <FaBars size={24} />
      </button>
      <h1 className="text-2xl font-bold text-blue-800 capitalize">
        {activeSection}
      </h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Admin User</span>
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  </header>
);
