import React, { createContext } from 'react'
import io from 'socket.io-client'
import dotenv from 'dotenv'
dotenv.config()
const SocketContext = createContext()
const SocketProvider = ({ children }) => {
    const ENDPOINT = process.env.REACT_APP_SERVER_URL;
    const socket = io(ENDPOINT, { transports: ['websocket', 'polling'] })
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export { SocketContext, SocketProvider }
