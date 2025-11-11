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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (password !== confirmPassword) {
      setMessage("⚠️ Passwords do not match.");
      return;
    }

    try {
      const result = await register("", email, password);

      if (result.success) {
        navigate("/saved-designs");
      } else {
        setMessage(result.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setMessage("An unexpected error occurred during registration.");
    }
  };

  return (
    <div className="register-container">
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

          {message && (
            <div
              style={{
                backgroundColor: "#f8d7da",
                color: "#721c24",
                border: "1px solid #f5c6cb",
                padding: "10px",
                marginBottom: "15px",
                borderRadius: "5px",
              }}
            >
              {message}
            </div>
          )}

          <div className="buttons">
            <button type="submit" className="register-btn">
              Confirm
            </button>
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
  );
}

export default RegisterPage;
