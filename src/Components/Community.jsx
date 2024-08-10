import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import ChatRoom from "./chatRoom";
import { SocketProvider, useSocket } from "../context/socketProvider";
export const topics = [
  { name: "App Development", icon: "📱", slug: "app-dev" },
  { name: "Web Development", icon: "🌐", slug: "web-dev" },
  { name: "AI & Machine Learning", icon: "🤖", slug: "ai-ml" },
  { name: "Data Science", icon: "📊", slug: "data-science" },
  { name: "Cybersecurity", icon: "🔒", slug: "cybersecurity" },
  { name: "Cloud Computing", icon: "☁️", slug: "cloud-computing" },
];

function TopicCard({ topic, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer"
      onClick={() => onClick(topic)}
    >
      <div className="text-4xl mb-4">{topic.icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
        {topic.name}
      </h3>
    </motion.div>
  );
}

function Community() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const club = searchParams.get("club");
  const socket = useSocket();
  const selectedTopic = topics.find((topic) => topic.slug === club);

  const handleTopicClick = (topic) => {
    if (socket) {
      socket.emit("join", topic.slug);
      navigate(`/community?club=${topic.slug}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-zinc-800 via-blue-600 to-blue-900 p-8">
      <div className="max-w-6xl mx-auto">
        {!selectedTopic && (
          <>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-white text-center mb-4"
            >
              Welcome to Community Chat{" "}
              <span className="animate-waving-hand">👋🏻</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-white text-center mb-12"
            >
              Connect with your peers and participate in discussions.
            </motion.p>
          </>
        )}

        {selectedTopic ? (
            <ChatRoom topic={selectedTopic} />
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {topics.map((topic) => (
              <TopicCard
                key={topic.name}
                topic={topic}
                onClick={handleTopicClick}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Community;
