import React from "react";
import { motion } from "framer-motion";

const eventData = [
  {
    title: "Python 5 Days BootCamp",
    date: "25/7/24",
    description: "Looking forward to seeing you there",
  },
  {
    title: "Web Development Workshop",
    date: "10/8/24",
    description: "Learn the latest web technologies",
  },
  {
    title: "AI & Machine Learning Seminar",
    date: "15/9/24",
    description: "Explore the future of AI",
  },
];

function Events() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-700 to-neutral-900 p-6 text-white"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-5xl font-bold mb-4">Upcoming Events</h2>
        <p className="text-xl text-gray-300">
          Discover our exciting events and activities
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto space-y-8">
        {eventData.map((event, index) => (
          <motion.div
            key={index}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
              <h3 className="text-2xl font-semibold text-white">
                {event.title}
              </h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-2">
                <span className="font-semibold">Date:</span> {event.date}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {event.description}
              </p>
            </div>
            <motion.div
              className="px-6 py-4 bg-gray-100 dark:bg-gray-700"
              whileHover={{ backgroundColor: "#4F46E5" }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="w-full text-center text-indigo-600 dark:text-indigo-400 font-semibold hover:text-white transition duration-300">
                Learn More
              </button>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Events;
