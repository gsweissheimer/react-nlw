import React, { createContext, useState, useEffect, ReactNode } from 'react';

import { User } from '../types';

interface AuthContextType {
    token: string | null;
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    token: null,
    user: null,
    login: (token: string) => {},
    logout: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (token) {
            fetchUserData(token);
        }
    }, [token]);

    const fetchUserData = async (token: string): Promise<void> => {
        const response = await fetch('/user', {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) {
            const data: User = await response.json();
            setUser(data);
        }
    };

    const login = (newToken: string) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
