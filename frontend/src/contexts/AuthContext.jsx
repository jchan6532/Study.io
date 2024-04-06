import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({children}) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn) setIsLoggedIn(JSON.parse(loggedIn));
  }, []);

  const login = () => {
    localStorage.setItem('isLoggedIn', JSON.stringify(true));
    setIsLoggedIn(true);
  }
  const logout = () => {
    localStorage.setItem('isLoggedIn', JSON.stringify(false));
    setIsLoggedIn(false);
  }

  console.log(isLoggedIn);
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);