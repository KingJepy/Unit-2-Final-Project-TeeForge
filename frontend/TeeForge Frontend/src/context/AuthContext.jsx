import { createContext, useContext, useState, useEffect } from "react";

// set up the AuthContext to manage user authentication state globally

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    const value = { user, login, logout, isLoggedIn: !!user };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

}

export function useAuth() {
    return useContext(AuthContext);
}