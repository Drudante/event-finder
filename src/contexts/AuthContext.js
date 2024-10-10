// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { Auth } from "aws-amplify"; // Correct import

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setCurrentUser(user);
      } catch {
        setCurrentUser(null);
      }
    };

    checkUser();
  }, []);

  return <AuthContext.Provider value={{ currentUser, setCurrentUser }}>{children}</AuthContext.Provider>;
}
