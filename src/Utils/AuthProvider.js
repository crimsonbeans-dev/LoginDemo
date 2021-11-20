import React, { useEffect, useState } from "react";
import { db, firebaseApp } from "./firebaseConfig";
import { getAuth } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getAuth(firebaseApp).onAuthStateChanged(setUser);
  }, []);

  useEffect(() => {
    if (user) {
      const unsub = onSnapshot(doc(db, "users", user?.uid), (doc) => {
        // ...
        if (doc.exists) setUserData(doc.data());
      });
      return unsub;
    }
  }, [user]);

  useEffect(() => {
    if (user) localStorage.setItem("userId", user?.uid);
    else localStorage.clear();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, userData }}>
      {children}
    </AuthContext.Provider>
  );
};
