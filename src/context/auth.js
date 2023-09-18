import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
    role: ""
    
  });


  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      try {
        const parseData = JSON.parse(data);
        setAuth((prevAuth) => ({
          ...prevAuth,
          user: parseData.user,
          token: parseData.token,
          role: parseData.role,
        }));
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