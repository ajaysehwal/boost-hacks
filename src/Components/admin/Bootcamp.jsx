import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaLink } from "react-icons/fa";
export const BootcampForm = ({ onSubmit }) => {
  const [bootcamp, setBootcamp] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    link: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(bootcamp);
    setBootcamp({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      link: "",
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-lg p-6 mb-6"
    >
      <h3 className="text-xl font-semibold mb-4 text-blue-800">
        Add New Bootcamp
      </h3>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Bootcamp Name"
          value={bootcamp.name}
          onChange={(e) => setBootcamp({ ...bootcamp, name: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          placeholder="Bootcamp Description"
          value={bootcamp.description}
          onChange={(e) =>
            setBootcamp({ ...bootcamp, description: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="date"
          placeholder="Start Date"
          value={bootcamp.startDate}
          onChange={(e) =>
            setBootcamp({ ...bootcamp, startDate: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="date"
          placeholder="End Date"
          value={bootcamp.endDate}
          onChange={(e) =>
            setBootcamp({ ...bootcamp, endDate: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="url"
          placeholder="Joining Link"
          value={bootcamp.link}
          onChange={(e) => setBootcamp({ ...bootcamp, link: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Bootcamp
        </motion.button>
      </div>
    </motion.form>
  );
};

export const BootcampList = ({ bootcamps }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-white rounded-lg shadow-lg p-6"
  >
    <h3 className="text-xl font-semibold mb-4 text-blue-800">Bootcamps</h3>
    <ul className="space-y-4">
      {bootcamps.map((bootcamp, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="border-b pb-4"
        >
          <h4 className="font-semibold text-blue-700">{bootcamp.name}</h4>
          <p className="text-gray-600">{bootcamp.description}</p>
          <p className="text-sm text-gray-500">
            {new Date(bootcamp.startDate).toLocaleDateString()} -{" "}
            {new Date(bootcamp.endDate).toLocaleDateString()}
          </p>
          <a
            href={bootcamp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition duration-200"
          >
            <FaLink />
            <span>View Bootcamp</span>
          </a>
        </motion.li>
      ))}
    </ul>
  </motion.div>
);
