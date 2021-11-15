import React, { useEffect, useState } from "react";
import { firebaseApp } from "./firebaseConfig";
import { getAuth } from "firebase/auth";
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getAuth(firebaseApp).onAuthStateChanged(setUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
