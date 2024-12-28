// Imports
import { useState, useEffect } from 'react';
import axiosInstance from '../../api/config/axiosConfig';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useNavigate } from '@tanstack/react-router';
import { SessionContextType, SessionProviderProps, User } from '.';
import { SessionContext } from '.';

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    checkSessionStatus();
  }, []);

  const checkSessionStatus = async (): Promise<void> => {
    try {
      const response = await axiosInstance.get('/auth/check-session');
      if (response.statusText === 'OK') {
        setIsAuthenticated(true);
        setUser(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (credentials: {
    email: string;
    password: string;
  }): Promise<void> => {
    try {
      const response = await axiosInstance.post('/auth/login', credentials);
      if (response.statusText === 'OK') {
        setIsAuthenticated(true);
        setUser(response.data);
        navigate({ to: '/' });
      }
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
      }
    }
  };

  const loginWithGoogle = (): void => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  };

  const logout = async (): Promise<void> => {
    try {
      const response = await axiosInstance.post('/auth/logout');
      if (response.statusText === 'OK') {
        setIsAuthenticated(false);
        setUser(null);
        navigate({ to: '/' });
      }
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
      }
    }
  };

  const contextValue: SessionContextType = {
    isAuthenticated,
    user,
    checkSessionStatus,
    login,
    loginWithGoogle,
    logout,
  };

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
};
