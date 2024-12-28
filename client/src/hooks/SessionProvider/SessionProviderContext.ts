// Imports
import { createContext, useContext } from 'react';
import { SessionContextType } from './SessionProviderInterfaces';

// Context
export const SessionContext = createContext<SessionContextType | null>(null);

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
