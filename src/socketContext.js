import React, { createContext } from "react";
import io from "socket.io-client";
const SocketContext = createContext();
const SocketProvider = ({ children }) => {
  const ENDPOINT = "https://fortlaxhehe.onrender.com/";
  console.log(process.env.REACT_APP_NODE_ENV);
  const socket = io(ENDPOINT, { transports: ["websocket", "polling"] });
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
