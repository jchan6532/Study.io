import React, { createContext, useContext } from 'react';
import socket from '../services/socketio';

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={{socket}}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
