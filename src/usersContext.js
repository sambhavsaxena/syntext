import React, { useState, createContext } from 'react'
const UsersContext = createContext()
const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    return (
        <UsersContext.Provider value={{ users, setUsers }}>
            {children}
        </UsersContext.Provider>
    )
}
export { UsersContext, UsersProvider } 
