import React, {createContext, useContext, useState, ReactNode} from "react";
import axios from "axios";

interface LoginArguments {
    email: string;
    password: string;
}

interface SignupArguments {
    email: string;
    password: string;
    fullName: string;
}

interface AuthContextType {
    isLoggedIn: boolean;
    user: { fullName: string } | null;
    login: (data: LoginArguments) => Promise<void>;
    signup: (data: SignupArguments) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authToken"));
    const [user, setUser] = useState<{ fullName: string } | null>(
        JSON.parse(localStorage.getItem("user") || "null")
    );

    const axiosInstance = axios.create({
        baseURL: "http://localhost:8000",
        headers: {
            "Content-Type": "application/json",
        },
    });

    axiosInstance.interceptors.request.use((config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    const login = async ({email, password}: LoginArguments) => {
        try {
            const response = await axiosInstance.post("/user/login", {email, password});

            const {accessToken, user: fetchedUser} = response.data;

            localStorage.setItem("authToken", accessToken);
            localStorage.setItem("user", JSON.stringify(fetchedUser));

            setUser(fetchedUser);
            setIsLoggedIn(true);
        } catch (error) {
            console.error("Login failed:", error);
            throw new Error("Invalid credentials. Please try again.");
        }
    };

    const signup = async ({email, password, fullName}: SignupArguments) => {
        try {
            const response = await axiosInstance.post("/user/register", {email, password, fullName});

            const {accessToken, user: registeredUser} = response.data;

            localStorage.setItem("authToken", accessToken);
            localStorage.setItem("user", JSON.stringify(registeredUser));

            setUser(registeredUser);
            setIsLoggedIn(true);
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                const status = error.response?.status;
                const message = error.response?.data?.message;

                if (status === 409) {
                    throw new Error("A user with this email already exists. Please try logging in..");
                }

                console.error("Signup failed:", message || error.message);
                throw new Error(message || "Registration failed. Please try again.");
            } else {
                console.error("Unexpected error during signup:", error);
                throw new Error("An unexpected error occurred. Please try again later.");
            }
        }
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");

        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, user, login, signup, logout}}>
            {children}
        </AuthContext.Provider>
    );
};