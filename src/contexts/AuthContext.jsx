import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock functions for auth actions
  const login = async (email, password) => {
    setLoading(true);
    try {
      // Mock successful login
      if (!email || !password) {
        throw new Error("Email and password are required.");
      }
      setUser({ id: "123", name: "User", email });
      return true;
    } catch (error) {
      console.error("Login error:", error);
      throw error; // Re-throw the error for caller to catch
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      // Mock successful signup
      if (!name || !email || !password) {
        throw new Error("All fields are required for signup.");
      }
      setUser({ id: "123", name, email });
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      throw error; // Re-throw the error
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
