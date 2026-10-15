"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { login as apiLogin } from "@/lib/api";

interface UserProfile {
  email: string;
  name: string;
}

interface AuthContextType {
  token: string | null;
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "dev_portfolio_token";
const USER_KEY = "dev_portfolio_user";
const EXPIRES_KEY = "dev_portfolio_expires_at";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(EXPIRES_KEY);
      document.cookie = "auth_token=; path=/; max-age=0; SameSite=Lax";
    }
    router.push("/admin/login");
  }, [router]);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);
      const expiresAt = localStorage.getItem(EXPIRES_KEY);

      if (storedToken && storedUser && expiresAt) {
        if (new Date(expiresAt).getTime() > Date.now()) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          document.cookie = `auth_token=${storedToken}; path=/; max-age=604800; SameSite=Lax`;
        } else {
          // Token expired
          logout();
        }
      }
    } catch (e) {
      console.error("Error reading auth state:", e);
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await apiLogin({ email, password });

      const profile: UserProfile = {
        email: response.email,
        name: response.name,
      };

      setToken(response.token);
      setUser(profile);

      localStorage.setItem(TOKEN_KEY, response.token);
      localStorage.setItem(USER_KEY, JSON.stringify(profile));
      localStorage.setItem(EXPIRES_KEY, response.expiresAt);
      document.cookie = `auth_token=${response.token}; path=/; max-age=604800; SameSite=Lax`;

      router.push("/admin/drafts");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
