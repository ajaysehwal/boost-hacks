import { createContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const CHAT_SERVER_URL = urls.chatServer;

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [isSocketReady, setIsSocketReady] = useState(false);
  const socket = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      socket.current = io(CHAT_SERVER_URL, {
        query: { userId: user.uid },
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
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
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [user]);

  if (!isSocketReady) {
    return null;
  }

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};

import { useContext } from "react";
import { urls } from "../libs/url";

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
