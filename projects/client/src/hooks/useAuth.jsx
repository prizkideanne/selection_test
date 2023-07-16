import React, { createContext, useContext, useState } from "react";
import { useApi } from "./useApi";

// Create a context for the auth state
const AuthContext = createContext();

// Create a provider component for the auth context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { fetchApi } = useApi();

  // const token = localStorage.getItem("accessToken");

  // const getUserData = async () => {
  //   if (token) {
  //     const response = await fetchApi(`auth/loginWithToken`, "GET");
  //     const { data } = await response;

  //     if (data.token) {
  //       localStorage.setItem("accessToken", data.token);
  //       setUser(data);
  //       return data;
  //     }
  //   }
  // };

  const login = async (email, password) => {
    // Perform your login logic here, e.g. send a request to your API
    // If the login is successful, update the user state and store the access token in the localStorage
    const response = await fetchApi(`auth/login`, "POST", {
      email,
      password,
    });
    const { data } = await response;
    console.log(data);
    if (data.token) {
      localStorage.setItem("accessToken", data.token);
      setUser(data); // This is just an example, replace with your actual user data
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
