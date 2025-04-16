import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any | null>(null);

  const login = async (email: string, password: string) => {
    // ログイン処理
  };

  const signup = async (email: string, password: string, username: string) => {
    // サインアップ処理
  };

  const logout = () => {
    // ログアウト処理
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
