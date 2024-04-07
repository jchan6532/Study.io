import { createContext, useContext, useEffect, useState } from "react";
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect, 
  signOut, 
  onAuthStateChanged 
} from "@firebase/auth";
import { auth } from "../services/firebase";
import useSigninProvider from "../hooks/useSiginProvider";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [user, setUser] = useState(null);
  const {signinProvider} = useSigninProvider();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn) setIsLoggedIn(JSON.parse(loggedIn));

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if(!currentUser) {
        localStorage.setItem('isLoggedIn', JSON.stringify(false));
        setIsLoggedIn(false);
        return;
      };

      const token = await currentUser.getIdToken();
      try {
        const response = await signinProvider(token);
        if(response.hasOwnProperty('error')) setUser(null);
        else setUser(currentUser);

        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        setIsLoggedIn(true);
      } catch (error) {
        setUser(null);
        localStorage.setItem('isLoggedIn', JSON.stringify(false));
        setIsLoggedIn(false);
      }
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);

  const login = (user) => {
    localStorage.setItem('isLoggedIn', JSON.stringify(true));
    setIsLoggedIn(true);
    setUser(user);
  }
  const logout = () => {
    localStorage.setItem('isLoggedIn', JSON.stringify(false));
    setIsLoggedIn(false);
    setUser(null);
  }
  
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }

  const googleSignOut = async () => {
    signOut(auth);
    setUser(null);
  }

  if(loading) return null;
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, googleSignIn, googleSignOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);