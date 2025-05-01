// src/context/UserContext.tsx
import { createContext, ReactNode, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { User } from '../types';

interface UserContextType {
  user: User | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(AuthContext);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser(): UserContextType {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return ctx;
}
