import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
// Note: authApi import removed for template mode - using mock authentication

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user" | "moderator";
  avatar?: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem("auth_user");
        const storedToken = localStorage.getItem("auth_token");

        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Failed to parse stored auth data:", error);
        localStorage.removeItem("auth_user");
        localStorage.removeItem("auth_token");
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);

    try {
      // Template mode - accept any email/password combination
      // In a real app, this would make an API call

      // Basic validation - just check if email and password are provided
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      // Create mock user data based on the email
      const mockUser: User = {
        id: `user_${Date.now()}`,
        email: email.trim().toLowerCase(),
        name:
          email.split("@")[0].charAt(0).toUpperCase() +
          email.split("@")[0].slice(1),
        role: "admin",
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          email.split("@")[0]
        )}&background=3b82f6&color=fff`,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };

      const mockToken = `mock_token_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      // Store auth data
      localStorage.setItem("auth_user", JSON.stringify(mockUser));
      localStorage.setItem("auth_token", mockToken);

      setUser(mockUser);
    } catch (error) {
      // Handle validation errors
      if (error && typeof error === "object" && "message" in error) {
        throw new Error((error as Error).message);
      }
      throw new Error("Please enter valid email and password");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string
  ): Promise<void> => {
    setIsLoading(true);

    try {
      // Template mode - accept any email/password/name combination
      // In a real app, this would make an API call

      // Basic validation
      if (!email || !password || !name) {
        throw new Error("All fields are required");
      }

      if (name.trim().length < 2) {
        throw new Error("Name must be at least 2 characters long");
      }

      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Please enter a valid email address");
      }

      // Create mock user data
      const mockUser: User = {
        id: `user_${Date.now()}`,
        email: email.trim().toLowerCase(),
        name: name.trim(),
        role: "admin",
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          name
        )}&background=3b82f6&color=fff`,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };

      const mockToken = `mock_token_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      // Store auth data
      localStorage.setItem("auth_user", JSON.stringify(mockUser));
      localStorage.setItem("auth_token", mockToken);

      setUser(mockUser);
    } catch (error) {
      // Handle validation errors
      if (error && typeof error === "object" && "message" in error) {
        throw new Error((error as Error).message);
      }
      throw new Error("Registration failed - please check your information");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Template mode - no API call needed
      // In a real app, this would call authApi.logout()
      console.log("Logging out user (template mode)");
    } catch (error) {
      // Even if logout API fails, we still clear local data
      console.warn("Logout process:", error);
    } finally {
      // Clear local storage and state
      localStorage.removeItem("auth_user");
      localStorage.removeItem("auth_token");
      setUser(null);
    }
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem("auth_user", JSON.stringify(updatedUser));
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
