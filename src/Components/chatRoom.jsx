import { useSocket } from "../context/socketProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { useRef, useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import EmojiPicker from "emoji-picker-react";

const MessageSkeleton = () => (
  <div className="animate-pulse flex space-x-4 mb-4">
    <div className="rounded-full bg-gray-300 h-10 w-10"></div>
    <div className="flex-1 space-y-2 py-1">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>
    </div>
  </div>
);

const Message = ({ msg, isCurrentUser }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className={`mb-4 flex`}
  >
    <div
      className={`max-w-[70%] ${isCurrentUser ? "order-last" : "order-first"}`}
    >
      {!isCurrentUser && (
        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
          {msg.username}
        </span>
      )}
      <div
        className={`rounded-2xl py-2 px-4 ${
          isCurrentUser
            ? "bg-blue-500 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        }`}
      >
        <p className="text-sm leading-relaxed break-words">{msg.message}</p>
      </div>
      <div
        className={`text-xs mt-1 text-left`}
      >
        <span className="text-gray-500 dark:text-gray-400">
          {new Date(msg.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  </motion.div>
);

export default function ChatRoom({ topic }) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const socket = useSocket();
  const { user } = useAuth();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const club = searchParams.get("club");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const sendMessage = (e) => {
    e.preventDefault();
    if (socket && message.trim() !== "") {
      const newMessage = {
        id: Date.now(),
        message: message.trim(),
        userId: user.uid,
        username: user.email || "Anonymous",
        timestamp: new Date().toISOString(),
      };
      socket.emit("sendMessage", club, newMessage);
      setMessage("");
    }
  };

  const handleReceiveMessage = useCallback((message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const handleEmojiClick = (emojiObject) => {
    const cursor = inputRef.current.selectionStart;
    const text =
      message.slice(0, cursor) + emojiObject.emoji + message.slice(cursor);
    setMessage(text);
    setShowEmojiPicker(false);
    inputRef.current.focus();
  };

  useEffect(() => {
    if (socket) {
      socket.emit("join", club);

      socket.emit("getMessages", club, (messages) => {
        setMessages(messages);
        setIsLoading(false);
      });

      socket.on("receiveMessage", handleReceiveMessage);

      return () => {
        socket.off("receiveMessage", handleReceiveMessage);
      };
    }
  }, [socket, topic.slug, club, handleReceiveMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-[80vh] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {topic.name} {topic.icon} Chat
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/community")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300"
        >
          Back
        </motion.button>
      </div>
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-4 overflow-y-auto">
          <AnimatePresence>
            {isLoading ? (
              Array(5)
                .fill(0)
                .map((_, index) => <MessageSkeleton key={index} />)
            ) : (
              messages.map((msg) => (
                <Message
                  key={msg.id}
                  msg={msg}
                  isCurrentUser={msg.userId === user.uid}
                />
              ))
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

      <form onSubmit={sendMessage} className="flex relative">
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-2 pr-10 rounded-l border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="absolute right-[80px] top-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-smile"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" x2="9.01" y1="9" y2="9" />
            <line x1="15" x2="15.01" y1="9" y2="9" />
          </svg>
        </button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!user || message.trim() === ""}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Send
        </motion.button>
      </form>
      {showEmojiPicker && (
        <div className="absolute bottom-16 right-20">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
}
