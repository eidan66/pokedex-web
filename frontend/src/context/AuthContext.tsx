import React, {createContext, useContext, useState, ReactNode} from "react";

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
    login: (data: LoginArguments) => void;
    signup: (data: SignupArguments) => void;
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

    const login = ({email, password}: LoginArguments) => {
        if (!email || !password) {
            return;
        }
        localStorage.setItem("authToken", "mockToken");
        setUser({fullName: "John Doe"}); // Replace with actual user data from backend
        localStorage.setItem("user", JSON.stringify({fullName: "John Doe"}));
        setIsLoggedIn(true);
    };

    const signup = ({email, password, fullName}: SignupArguments) => {
        if (!email || !password || !fullName) {
            return;
        }
        localStorage.setItem("authToken", "mockToken");
        setUser({fullName});
        localStorage.setItem("user", JSON.stringify({fullName}));
        setIsLoggedIn(true);
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