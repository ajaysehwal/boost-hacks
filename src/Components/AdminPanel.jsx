import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminPanel() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/events"); // Adjust base URL if needed
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/events", newEvent); // Adjust base URL if needed
      setNewEvent({ title: "", description: "", date: "" });
      fetchEvents();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="bg-gradient-to-t from-zinc-800 via-blue-600 to-blue-900 min-h-screen py-10 text-white">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Admin Panel - Event Notifications
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 p-8 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="title">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Event Title"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="description"
            >
              Event Description
            </label>
            <textarea
              name="description"
              value={newEvent.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Event Description"
              rows="4"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="date">
              Event Date
            </label>
            <input
              type="date"
              name="date"
              value={newEvent.date}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 font-semibold"
          >
            Create Event
          </button>
        </form>

        <h2 className="text-3xl font-semibold mt-10 mb-4">Event List</h2>
        <ul className="space-y-4">
          {events.map((event, index) => (
            <li key={index} className="bg-zinc-900 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
              <p className="mb-2">{event.description}</p>
              <p className="text-sm">
                Date: {new Date(event.date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminPanel;
