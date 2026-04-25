import { createContext, useContext, useState, useEffect } from "react";

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

  // Updated login using fetch with JSON body
  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:8000/company/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        const token = data.access_token;
        localStorage.setItem("companyToken", token);
        setToken(token);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        const err = await res.json().catch(() => ({}));
        return { success: false, message: err.detail || "Login failed" };
      }
    } catch (error) {
      return { success: false, message: "Network error" };
    }
  };

  // JSON login method
  const loginJSON = async (email, password) => {
    try {
      const res = await fetch("http://localhost:8000/company/login-json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const token = data.access_token;
        localStorage.setItem("companyToken", token);
        setToken(token);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        const error = await res.json();
        return { success: false, message: error.detail || "Login failed" };
      }
    } catch (error) {
      return { success: false, message: "Network error" };
    }
  };

  const logout = () => {
    localStorage.removeItem("companyToken");
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
