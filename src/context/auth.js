import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
    role: "",
  });

  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      try {
        const parseData = JSON.parse(data);
        const decodedToken = jwtDecode(parseData.token);

        if (decodedToken) {

          setAuth((prevAuth) => ({
            ...prevAuth,
            user: parseData.user,
            token: parseData.token,
            role: parseData.role,
          }));
          axios.defaults.headers.common["Authorization"] = parseData.token;
        } else {
          console.error("JWT token malformed or expired.");

          setAuth((prevAuth) => ({
            ...prevAuth,
            user: parseData.user,
            token: "",
            role: parseData.role,
          }));
          axios.defaults.headers.common["Authorization"] = "";
        }
      } catch (error) {
        console.error("Error parsing auth data:", error);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
