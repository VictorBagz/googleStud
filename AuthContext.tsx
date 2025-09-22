import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { account } from './appwriteClient';
import { Models } from 'appwrite';

interface AuthContextType {
    currentUser: Models.User<Models.Preferences> | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<Models.Session>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const user = await account.get();
                setCurrentUser(user);
            } catch (error) {
                setCurrentUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkUserSession();
    }, []);

    const login = async (email: string, password: string) => {
        const session = await account.createEmailPasswordSession(email, password);
        const user = await account.get();
        setCurrentUser(user);
        return session;
    };

    const logout = async () => {
        await account.deleteSession('current');
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        loading,
        login,
        logout,
    };

    // By rendering children immediately, we prevent a blank screen if the initial
    // session check is slow. Components that need auth data can handle their own loading state.
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};