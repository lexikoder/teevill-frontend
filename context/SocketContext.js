"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// 🔌 Create context
const SocketContext = createContext(null);

// ✅ Hook to consume socket
export const useSocket = () => {
  return useContext(SocketContext);
};

// ✅ Provider component
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Use env variable so it works across dev/prod
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "https://teevil-api-1.onrender.com";

    const newSocket = io(socketUrl, {
      withCredentials: true,
      transports: ["websocket"], // ensure WS is preferred
    });

    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

