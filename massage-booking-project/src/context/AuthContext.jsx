import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if(currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        getDoc(userRef).then((snap) => {
          if(snap.exists()) {
            setRole(snap.data().role || 'user');
          }
        })
      }
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Optional: logout method
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy use
export function useAuth() {
  return useContext(AuthContext);
}
