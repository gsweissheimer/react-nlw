import { createContext, useState, useEffect, ReactNode } from 'react';

import { useUserState } from '../hooks/useUserState';

import { User, AuthContextType } from '../types';

export const AuthContext = createContext<AuthContextType>({
    token: null,
    user: {} as User,
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
        console.log('Token set in localStorage:', newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(undefined);
    };

    return (
        <AuthContext.Provider value={{ token, user: user as User, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
