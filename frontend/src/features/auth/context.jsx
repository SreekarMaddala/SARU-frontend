import { createContext, useContext, useState, useEffect } from "react";
import { loginCompany, loginCompanyJSON, logoutCompany } from "./api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("companyToken");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const result = await loginCompany(email, password);
      setToken(result.token);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message || "Login failed" };
    }
  };

  const loginJSON = async (email, password) => {
    try {
      const result = await loginCompanyJSON(email, password);
      setToken(result.token);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message || "Login failed" };
    }
  };

  const logout = () => {
    logoutCompany();
    setToken(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    token,
    login,
    loginJSON,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
