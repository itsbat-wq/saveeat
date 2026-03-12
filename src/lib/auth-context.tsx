"use client";

// ============================================================
// SaveEat - Auth Context (Mock Authentication)
// ============================================================

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { User, UserRole, LoginCredentials, RegisterCredentials } from "@/types";
import { MOCK_USERS, DEMO_CREDENTIALS } from "@/lib/mock-data";
import { getFromStorage, setToStorage, removeFromStorage } from "@/lib/utils";

// -------------------------------------------------------
// Types
// -------------------------------------------------------

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: (role: UserRole) => Promise<{ success: boolean; error?: string }>;
  register: (credentials: RegisterCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

// -------------------------------------------------------
// Context
// -------------------------------------------------------

const AuthContext = createContext<AuthContextValue | null>(null);

// -------------------------------------------------------
// Storage Keys
// -------------------------------------------------------

const STORAGE_KEY_USER = "saveeat_user";
const STORAGE_KEY_SESSION = "saveeat_session";

// -------------------------------------------------------
// Mock Auth Logic
// -------------------------------------------------------

function findMockUser(email: string, role: UserRole): User | undefined {
  return MOCK_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.role === role
  );
}

function validateCredentials(email: string, password: string): boolean {
  const isStudentDemo =
    email === DEMO_CREDENTIALS.student.email &&
    password === DEMO_CREDENTIALS.student.password;
  const isMerchantDemo =
    email === DEMO_CREDENTIALS.merchant.email &&
    password === DEMO_CREDENTIALS.merchant.password;
  // Also accept any @saveeat.id email with demo1234
  const isGenericDemo = email.endsWith("@saveeat.id") && password === "demo1234";
  return isStudentDemo || isMerchantDemo || isGenericDemo;
}

function createMockUser(email: string, name: string, role: UserRole): User {
  return {
    id: `user-${role}-${Date.now()}`,
    email,
    name,
    role,
    avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
    created_at: new Date().toISOString(),
  };
}

// -------------------------------------------------------
// Provider
// -------------------------------------------------------

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Rehydrate user from localStorage on mount
  useEffect(() => {
    const stored = getFromStorage<User | null>(STORAGE_KEY_USER, null);
    const session = getFromStorage<string | null>(STORAGE_KEY_SESSION, null);

    if (stored && session) {
      setUser(stored);
    }
    setIsLoading(false);
  }, []);

  // -------------------------------------------------------
  // Login with Email + Password
  // -------------------------------------------------------
  const login = useCallback(
    async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
      setIsLoading(true);

      // Simulate network delay
      await new Promise((res) => setTimeout(res, 800));

      const { email, password, role } = credentials;

      // Validate credentials
      const isValid = validateCredentials(email, password);
      if (!isValid) {
        setIsLoading(false);
        return {
          success: false,
          error: "Email atau password salah. Gunakan akun demo yang tersedia.",
        };
      }

      // Find existing mock user or create a new one
      let foundUser = findMockUser(email, role);
      if (!foundUser) {
        // Create a new user for any valid credentials
        foundUser = createMockUser(
          email,
          role === "student" ? "Mahasiswa SaveEat" : "Pemilik Toko",
          role
        );
      }

      // Check role matches
      if (foundUser.role !== role) {
        setIsLoading(false);
        return {
          success: false,
          error: `Akun ini terdaftar sebagai "${foundUser.role === "student" ? "Pelanggan" : "Pemilik Usaha"}". Silakan pilih role yang sesuai.`,
        };
      }

      setUser(foundUser);
      setToStorage(STORAGE_KEY_USER, foundUser);
      setToStorage(STORAGE_KEY_SESSION, `session-${Date.now()}`);
      setIsLoading(false);

      return { success: true };
    },
    []
  );

  // -------------------------------------------------------
  // Login with Google OAuth (simulated)
  // -------------------------------------------------------
  const loginWithGoogle = useCallback(
    async (role: UserRole): Promise<{ success: boolean; error?: string }> => {
      setIsLoading(true);

      // Simulate OAuth redirect delay
      await new Promise((res) => setTimeout(res, 1200));

      // Use demo user for Google OAuth simulation
      const demoEmail =
        role === "student"
          ? DEMO_CREDENTIALS.student.email
          : DEMO_CREDENTIALS.merchant.email;

      const foundUser = findMockUser(demoEmail, role);
      if (!foundUser) {
        setIsLoading(false);
        return { success: false, error: "Gagal masuk dengan Google. Coba lagi." };
      }

      setUser(foundUser);
      setToStorage(STORAGE_KEY_USER, foundUser);
      setToStorage(STORAGE_KEY_SESSION, `session-google-${Date.now()}`);
      setIsLoading(false);

      return { success: true };
    },
    []
  );

  // -------------------------------------------------------
  // Register
  // -------------------------------------------------------
  const register = useCallback(
    async (credentials: RegisterCredentials): Promise<{ success: boolean; error?: string }> => {
      setIsLoading(true);

      // Simulate network delay
      await new Promise((res) => setTimeout(res, 1000));

      const { email, name, role } = credentials;

      // Check if email already exists
      const existing = MOCK_USERS.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (existing) {
        setIsLoading(false);
        return { success: false, error: "Email sudah terdaftar. Silakan login." };
      }

      // Create new user
      const newUser = createMockUser(email, name, role);

      setUser(newUser);
      setToStorage(STORAGE_KEY_USER, newUser);
      setToStorage(STORAGE_KEY_SESSION, `session-new-${Date.now()}`);
      setIsLoading(false);

      return { success: true };
    },
    []
  );

  // -------------------------------------------------------
  // Logout
  // -------------------------------------------------------
  const logout = useCallback(() => {
    setUser(null);
    removeFromStorage(STORAGE_KEY_USER);
    removeFromStorage(STORAGE_KEY_SESSION);
  }, []);

  // -------------------------------------------------------
  // Update User
  // -------------------------------------------------------
  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      setToStorage(STORAGE_KEY_USER, updated);
      return updated;
    });
  }, []);

  // -------------------------------------------------------
  // Context Value
  // -------------------------------------------------------
  const value: AuthContextValue = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    loginWithGoogle,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// -------------------------------------------------------
// Hook
// -------------------------------------------------------

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}

// -------------------------------------------------------
// Role Guards (utility hooks)
// -------------------------------------------------------

export function useRequireAuth(requiredRole?: UserRole) {
  const { user, isLoading, isAuthenticated } = useAuth();

  const isAuthorized =
    isAuthenticated && (!requiredRole || user?.role === requiredRole);

  return { user, isLoading, isAuthenticated, isAuthorized };
}
