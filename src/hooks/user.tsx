import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { UserFetch } from "@/API/auth/functions";
import { Navigate, useLocation } from "react-router-dom";
import SendRequest from "@/API/request";
import { User as SupabaseAuthUser } from "@supabase/auth-js";

interface User extends SupabaseAuthUser {
  name?: string; // Mark name as optional if it's not always present
}

interface AuthContextType {
  user: User | undefined | null;
  loading: boolean;
  rank: number | null;
  refreshUser: () => Promise<void>;
}

// Provide a default value that matches the expected shape
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [rank, setRank] = useState<number | null>(null);

  const refreshUser = async () => {
    try {
      const userData = await UserFetch();
      setUser(userData);
      if (userData) {
        const response = await SendRequest({
          method: "GET",
          route: `/user/id/${userData.id}`,
        });
        if (!response.error) {
          setRank(response.rank);
        }
      }
    } catch {
      setUser(null);
      setRank(null);
    }
  };

  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, rank, refreshUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading, rank } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || rank === null || rank <= 50) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
