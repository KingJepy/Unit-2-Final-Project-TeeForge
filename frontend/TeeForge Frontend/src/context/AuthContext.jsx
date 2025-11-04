import { createContext, useContext, useState, useEffect } from "react";

// set up the AuthContext to manage user authentication state globally

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        try {
            const res = await fetch("http://localhost:8080/api/users");
            const users = await res.json();

            const foundUser = users.find(
                (u) => u.email === email && u.passwordHash === password
            );

            if (foundUser) {
                setUser(foundUser);
                return { success: true };
            } else {
                return { success: false, message: "Invalid email or password" };
            }
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, message: "Login failed" };
        }
    };

    const register = async (username, email, password) => {
        try {
            const res = await fetch("http://localhost:8080/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username,
                    email,
                    passwordHash: password,
                }),
            });
            const newUser = await res.json();
            setUser(newUser);
            return { success: true };
        } catch (error) {
            console.error("Registration error:", error);
            return { success: false, message: "Registration failed" };
        }
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}