import React, { createContext, useContext, useState } from "react";

// Create a context for the auth state
const AuthContext = createContext();

// Create a provider component for the auth context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    // Perform your login logic here, e.g. send a request to your API
    // If the login is successful, update the user state and store the access token in the localStorage
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
      setUser({ username, role: "employee" }); // This is just an example, replace with your actual user data
    }
  };

  const logout = () => {
    // Perform your logout logic here, e.g. clear the session data
    // Then, update the user state and remove the access token from the localStorage
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  // Provide the user state and auth methods to the context consumers
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook that uses the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
