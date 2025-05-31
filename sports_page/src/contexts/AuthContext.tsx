import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
    username: string
    isAdmin: boolean
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isLoading: boolean;
    login: (username: string, password: string, isSigningIn?: boolean) => Promise<{ success: boolean; error?: string}>;
    logout: () => Promise<void>;
    checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: ReactNode;
}

const API_URL = "http://localhost:3001";

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [ user, setUser ] =  useState<User | null>(null);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    const isAuthenticated = user !== null;
    const isAdmin = user?.isAdmin ?? false;

	console.log("User status:", isAuthenticated, isAdmin);

    const checkAuthStatus = async() => {
        try {
            const response = await fetch(`${API_URL}/verify`, {
                method: 'GET',
                credentials: 'include',
            });

            if(response.ok) {
                const data = await response.json();

                setUser({
                    username: data.username,
                    isAdmin: data.isAdmin,
                });

                console.log(data)
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Auth check failed: ", error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }


    // Login function
    const login = async (username: string, password: string, isSigningIn: boolean = false) => {
        try {
            const response = await fetch(`${API_URL}/${!isSigningIn ? 'login' : 'signup'}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // For login, verify the token and get user info
                if (!isSigningIn) {
                    await checkAuthStatus();
                }
                return { success: true };
            } else {
                return { success: false, error: data.error || 'Authentication failed' };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Network error' };
        }
    };

    // Logout function
    const logout = async () => {
        try {
            // Clear the cookie
            // Currently just deleting the cookies manually in chrome setting for testing
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Check auth status on mount
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const value: AuthContextType = {
        user,
        isAuthenticated,
        isAdmin,
        isLoading,
        login,
        logout,
        checkAuthStatus,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if(context === undefined){
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
