import React, {createContext, useContext, useState, ReactNode} from "react";

interface LoginArguments {
    email: string,
    password: string
}

interface AuthContextType {
    isLoggedIn: boolean;
    login: (data: LoginArguments) => void;
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

    const login = ({email, password}: LoginArguments) => {
        if (!email || !password) {
            // Throw an error here...
            return;
        }
        // Sending API login request to the server...
        localStorage.setItem("authToken", "yourTokenHere");
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};