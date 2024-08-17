import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { FaCalendar, FaClock, FaLink } from "react-icons/fa";

function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("events");
  const [events, setEvents] = useState([]);
  const [bootcamps, setBootcamps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsCollection = collection(db, "events");
        const bootcampsCollection = collection(db, "bootcamps");

        const [eventsSnapshot, bootcampsSnapshot, notificationsSnapshot] =
          await Promise.all([
            getDocs(eventsCollection),
            getDocs(bootcampsCollection),
          ]);

        const eventsList = eventsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const bootcampsList = bootcampsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEvents(eventsList);
        setBootcamps(bootcampsList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-700 to-neutral-900 flex justify-center items-center">
        <p className="text-white text-2xl">Loading data...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-700 to-neutral-900 p-6 text-white"
    >

      <div className="max-w-4xl mx-auto">
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 px-4 text-center ${
              activeTab === "events" ? "bg-blue-600" : "bg-gray-700"
            } rounded-l-lg`}
            onClick={() => setActiveTab("events")}
          >
            Events
          </button>
          <button
            className={`flex-1 py-2 px-4 text-center ${
              activeTab === "bootcamps" ? "bg-blue-600" : "bg-gray-700"
            } rounded-r-lg`}
            onClick={() => setActiveTab("bootcamps")}
          >
            Upcomming Bootcamps
          </button>
        </div>

        {activeTab === "events" && (
          <div className="space-y-8">
            <EventsList events={events} />
          </div>
        )}
        {activeTab === "bootcamps" && (
          <div className="space-y-8">
            <BootcampList bootcamps={bootcamps} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

const EventsList = ({ events }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="space-y-8"
  >
    <h3 className="text-2xl font-semibold mb-6 text-blue-300">
      Upcoming Events
    </h3>
    {events.map((event, index) => (
      <EventCard key={event.id} event={event} index={index} />
    ))}
  </motion.div>
);

const EventCard = ({ event, index }) => (
  <motion.div
    initial={{ x: -100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
    whileHover={{ scale: 1.03 }}
    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
  >
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
      <h3 className="text-2xl font-semibold text-white">{event.title}</h3>
    </div>
    <div className="p-6">
      <p className="text-gray-700 dark:text-gray-300 text-lg mb-2">
        <span className="font-semibold">Date:</span> {event.date}
      </p>
      <p className="text-gray-600 dark:text-gray-400">{event.description}</p>
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
);

const BootcampList = ({ bootcamps }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 grid grid-cols-1 gap-8"
  >
    {bootcamps.map((bootcamp, index) => (
      <BootcampCard key={bootcamp.id} bootcamp={bootcamp} index={index} />
    ))}
  </motion.div>
);

const BootcampCard = ({ bootcamp, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    className="bg-gray-50 dark:bg-gray-800 rounded-lg w-full hover:shadow-xl transition-shadow duration-300"
  >
    <div className="p-6">
      <h4 className="font-bold text-2xl text-gray-800 dark:text-gray-100 mb-4">
        {bootcamp.name}
      </h4>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        {bootcamp.description}
      </p>
      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
        <FaCalendar className="mr-2" />
        <span>
          {new Date(bootcamp.startDate).toLocaleDateString()} -{" "}
          {new Date(bootcamp.endDate).toLocaleDateString()}
        </span>
      </div>
      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-6">
        <FaClock className="mr-2" />
        <span>{bootcamp.duration}</span>
      </div>
      <a
        href={bootcamp.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-200"
      >
        <FaLink />
        <span>View Bootcamp</span>
      </a>
    </div>
  </motion.div>
);

export default StudentDashboard;
