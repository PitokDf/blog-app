// context/AuthContext.tsx
import { useToast } from '@/hooks/use-toast';
import axiosInstance from '@/lib/axios';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface User {
    id?: number
    first_name?: string
    last_name?: string
    email: string
    password: string
    registered_at?: string
    role?: string
}

type AuthContextType = {
    isLoggedIn: boolean;
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => void;
    register: (data: { first_name: string, last_name?: string | undefined, email: string, password: string }) => void;
    logout: () => void;
    serverErrors?: { path: string, msg: string }[]
};

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    user: { email: "", password: "" },
    login: () => { },
    logout: () => { },
    register: () => { },
    isLoading: false
});

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const { toast } = useToast()
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [serverErrors, setServerErrors] = useState<{ path: string, msg: string }[]>([])
    // Load user data from sessionStorage on initial render
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));

            setIsLoggedIn(true);
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true)
            const res = await axiosInstance.post("/auth/login", { email, password })
            if (res.data.success) {
                toast({ description: res.data.message })
                setUser(res.data.data.user)
                setIsLoggedIn(true);

                localStorage.setItem('user', JSON.stringify(res.data.data.user));
                localStorage.setItem('token', res.data.data.token);
                router.push("/dashboard")
            }
        } catch (error: any) {
            setIsLoading(false)
            toast({ description: `${error.response.data.message}`, duration: 3000 })
        }
    };
    const register = async (data: { first_name: string, last_name?: string | undefined, email: string, password: string }) => {
        try {
            setIsLoading(true)
            const res = await axiosInstance.post("/auth/register", data)
            if (res.data.success) {
                toast({ description: res.data.message })
                setUser(res.data.data.user)
                setIsLoggedIn(true);

                localStorage.setItem('user', JSON.stringify(res.data.data.user));
                localStorage.setItem('token', res.data.data.token);
                router.push("/dashboard")
            }
        } catch (error: any) {
            setIsLoading(false)
            const errors = error.response?.data?.errors || [];
            console.error("Gagal register:", error.message)
            if (Array.isArray(errors)) {
                setServerErrors(errors)
            }
            toast({ description: `${error.response.data.message}`, duration: 3000 })
        }
    };

    const logout = () => {
        setUser({ email: "", password: "" });
        setIsLoggedIn(false);
        localStorage.removeItem('user');
        window.location.href = "/login"
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, serverErrors, user, login, logout, isLoading, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
