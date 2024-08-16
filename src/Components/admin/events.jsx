import { useState } from "react";
import { motion } from "framer-motion";
export const EventForm = ({ onSubmit }) => {
  const [event, setEvent] = useState({ title: "", description: "", date: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(event);
    setEvent({ title: "", description: "", date: "" });
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
        Add New Event
      </h3>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Event Title"
          value={event.title}
          onChange={(e) => setEvent({ ...event, title: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          placeholder="Event Description"
          value={event.description}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="date"
          value={event.date}
          onChange={(e) => setEvent({ ...event, date: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Event
        </motion.button>
      </div>
    </motion.form>
  );
};

export const EventList = ({ events }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-white rounded-lg shadow-lg p-6"
  >
    <h3 className="text-xl font-semibold mb-4 text-blue-800">
      Upcoming Events
    </h3>
    <ul className="space-y-4">
      {events.map((event, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="border-b pb-4"
        >
          <h4 className="font-semibold text-blue-700">{event.title}</h4>
          <p className="text-gray-600">{event.description}</p>
          <p className="text-sm text-gray-500">
            {new Date(event.date).toLocaleDateString()}
          </p>
        </motion.li>
      ))}
    </ul>
  </motion.div>
);
