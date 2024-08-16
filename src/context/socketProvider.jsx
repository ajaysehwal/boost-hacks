import { createContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";
import { FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
const CHAT_SERVER_URL = "https://boostchat-server.koyeb.app";

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [isSocketReady, setIsSocketReady] = useState(false);
  const socket = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      socket.current = io(CHAT_SERVER_URL, {
        query: { userId: user.uid },
        transports: ["websocket", "polling"],
        withCredentials: true,
      });

      socket.current.on("connect", () => {
        console.log("Connected to the server");
        setIsSocketReady(true);
      });

      socket.current.on("error", (error) =>
        console.error("Socket error:", error)
      );

      return () => {
        if (socket.current) {
          socket.current.disconnect();
          socket.current = null;
        }
      };
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen w-full text-2xl text-blue-500 font-semibold">
        <p>Please Register or login for particate in community chat</p>
      </div>
    );
  }
  if (!isSocketReady) {
    return (
      <div class="flex items-center justify-center h-screen bg-gradient-to-t from-zinc-800 via-blue-600 to-blue-900">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};

import { useContext } from "react";

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

const LoadingScreen = () => (
  <div className="flex justify-center items-center h-64">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <FaSpinner className="text-white text-4xl" />
    </motion.div>
  </div>
);
