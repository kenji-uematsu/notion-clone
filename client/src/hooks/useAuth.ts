import { useState, useEffect, createContext, useContext } from "react";
import { api } from "../utils/api";
import User from "../types/user";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  signup: (email: string, password: string) => Promise<User>;
  logout: () => void;
}

// デフォルト値を提供するコンテキスト
export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {
    throw new Error("login not implemented");
  },
  signup: async () => {
    throw new Error("signup not implemented");
  },
  logout: () => {
    throw new Error("logout not implemented");
  },
});

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await api.getCurrentUser();
      setUser(currentUser);
    };
    fetchUser();
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    const loggedInUser = await api.login(email, password);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const signup = async (email: string, password: string) => {
    try {
      const newUser = await api.signup(email, password);
      setUser(newUser);
      return newUser;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const logout = () => {
    api.logout();
    setUser(null);
  };

  return { user, login, signup, logout };
};

// 認証コンテキストを使用するフック
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
