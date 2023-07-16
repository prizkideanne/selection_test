import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api";

// Create a context for the auth state
const AuthContext = createContext();

// Create a provider component for the auth context
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    await api.post(`auth/login`, { email, password }).then(({ data }) => {
      const response = data.data;
      console.log("response", response);
      if (response.token) {
        localStorage.setItem("accessToken", response.token);
        localStorage.setItem("user", JSON.stringify(response));
        setUser(response);
      }
    });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
