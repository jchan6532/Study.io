import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    localStorage.setItem('isLoggedIn', true);
    setIsLoggedIn(true);
  }
  const logout = () => {
    localStorage.setItem('isLoggedIn', false);
    setIsLoggedIn(false);
  }

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn) setIsLoggedIn(JSON.parse(loggedIn));
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);