// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config"; // Make sure 'auth' is exported in config.js

// Create Auth Context
const AuthContext = createContext();

//Custom hook so you can call useAuth() from any component
export const useAuth = () => {
  return useContext(AuthContext);
};

//provider component 
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Firebase listens to login and out state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser); //debug
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = { user };

  return (
    <AuthContext.Provider value={ value }>
      {!loading && children}
    </AuthContext.Provider>
  );
};
