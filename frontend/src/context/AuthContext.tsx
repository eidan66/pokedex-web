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
            alert("Invalid credentials. Please try again.");
            throw new Error(`Login failed. Please try again. error => ${error}`);
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
        } catch (error) {
            console.error("Signup failed:", error);
            alert("Registration failed. Please try again.");
            throw new Error(`Registration failed. Please try again. error => ${error}`)
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