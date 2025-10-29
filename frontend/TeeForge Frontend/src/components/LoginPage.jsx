import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";


function LoginPage() {

    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate login process
        if (email === "test@teeforge.com" && password === "password123") {
            const userData = { email };
            login(userData);
            navigate("/mydesigns");
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-96">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

                {error && (
                    <p className="text-red-500 mb-4 text-center">{error}</p>
                    )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            placeholder="********"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 font-semibold"
                    >
                        Login
                    </button>
                </form>

                <p className="text-sm text-center mt-4">
                    Don't have an account?{" "}
                    <a href="/register" className="text-blue-600 hover:underline">Sign Up</a>
                </p>
            </div>
        </div>

    );

}

export default LoginPage;