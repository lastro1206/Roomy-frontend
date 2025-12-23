import React, { createContext, ReactNode, useContext, useState } from "react";

type UserType = "user" | "admin" | null;

interface AuthContextType {
  userType: UserType;
  setUserType: (type: UserType) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userType, setUserType] = useState<UserType>(null);

  const logout = () => {
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{ userType, setUserType, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
