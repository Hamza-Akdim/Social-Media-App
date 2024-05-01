"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setUserId(token);
    }
  }, []);
  const login = (id, token) => {
    localStorage.setItem("authToken", token);
    setUserId(id);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ userId, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
