import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";

function RegisterPage() {

    const { register } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        const newUser = { email, password };
        register(newUser);
        navigate("/login");
    };



    return <div className="register-container">
        <div className="register-box">
            <h2>Register New User</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                {message && <div className="message">{message}</div>}

                <div className="buttons">
                    <button type="submit" className="register-btn">Confirm</button>
                    <button
                        type="button"
                        className="login-btn"
                        onClick={() => navigate("/login")}
                    >
                        Back to Login
                    </button>
                </div>

            </form>

        </div>
    </div>

}





export default RegisterPage;