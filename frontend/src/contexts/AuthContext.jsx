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
  const [user, setUser] = useState({});
  const {signinProvider} = useSigninProvider();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn) setIsLoggedIn(JSON.parse(loggedIn));

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if(!currentUser) return;
      console.log(currentUser);
      const token = await currentUser.getIdToken();
      await signinProvider(token);
      setUser(currentUser);
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);

  const login = () => {
    localStorage.setItem('isLoggedIn', JSON.stringify(true));
    setIsLoggedIn(true);
  }
  const logout = () => {
    localStorage.setItem('isLoggedIn', JSON.stringify(false));
    setIsLoggedIn(false);
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