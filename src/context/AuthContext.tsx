import { createContext, useState, useEffect, ReactNode } from 'react';

import { useUserState } from '../hooks/useUserState';

import { User } from '../types';

interface AuthContextType {
    token: string | null;
    user: User | undefined;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    token: null,
    user: undefined,
    login: (token: string) => {},
    logout: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
  
    const { user, setUser, getMyUser } = useUserState();

    useEffect(() => {
        if (token) {
            getMyUser();
        }
    }, [token]);

    const login = (newToken: string) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(undefined);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
