// Interfaces
export interface User {
  customer_id: string;
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  loyalty_points: number;
}
export interface SessionContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  loginWithGoogle: () => void;
  logout: () => Promise<void>;
  checkSessionStatus: () => Promise<void>;
}
export interface SessionProviderProps {
  children: React.ReactNode;
}
