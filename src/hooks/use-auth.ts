import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "@/contexts/AuthContext";
import { QUERY_KEYS } from "@/lib/constants";
import { toast } from "@/hooks/use-toast";

// Define useAuth hook locally to avoid fast refresh warnings
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Login mutation hook
export const useLogin = () => {
  const queryClient = useQueryClient();
  const { login } = useAuth();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      try {
        await login(email, password);
        return { success: true };
      } catch (error: unknown) {
        console.error("Login error in mutation:", error);
        return Promise.reject(error);
      }
    },
    onSuccess: () => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER });

      toast({
        title: "Welcome back!",
        description: "You have been successfully signed in.",
      });
    },
    onError: (error: unknown) => {
      console.error("Login error in onError:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Incorrect email or password. Please try again.";
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};

// Registration mutation hook
export const useRegister = () => {
  const queryClient = useQueryClient();
  const { register } = useAuth();

  return useMutation({
    mutationFn: async ({
      email,
      password,
      name,
    }: {
      email: string;
      password: string;
      name: string;
    }) => {
      try {
        await register(email, password, name);
        return { success: true };
      } catch (error: unknown) {
        console.error("Registration error in mutation:", error);
        return Promise.reject(error);
      }
    },
    onSuccess: () => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER });

      toast({
        title: "Registration Successful",
        description: "Account created successfully!",
      });
    },
    onError: (error: unknown) => {
      console.error("Registration error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Please try again.";
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};

// Logout mutation hook
export const useLogout = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuth();

  return useMutation({
    mutationFn: async () => {
      try {
        await logout();
        return { success: true };
      } catch (error: unknown) {
        console.error("Logout error in mutation:", error);
        // Don't throw error for logout - always succeed locally even if API fails
        return { success: true };
      }
    },
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();

      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    },
  });
};
