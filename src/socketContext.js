import React, { createContext } from 'react'
import io from 'socket.io-client'
const SocketContext = createContext()
const SocketProvider = ({ children }) => {
    const ENDPOINT = 'https://fortlax.herokuapp.com/';  //proxy this endpoint
    const socket = io(ENDPOINT, { transports: ['websocket', 'polling'] })
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export { SocketContext, SocketProvider }
