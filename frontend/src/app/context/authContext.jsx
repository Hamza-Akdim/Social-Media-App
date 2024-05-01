"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setUserId(token);
    }
  }, []);
  const login = (token) => {
    localStorage.setItem("authToken", token);
    setUserId(token);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
