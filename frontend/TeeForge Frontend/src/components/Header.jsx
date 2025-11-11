import React from "react";
import './Header.css';
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from 'react-router-dom'


function Header () {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/") // this will redirect to home page after a logout
    }

  return (
    <header className="header">
      <h1 className="nameInHeader">TeeForge</h1>
      <nav className="headerLinks">
        <Link to="/">Home</Link>
        <span> | </span>
        {user ? (
        <Link
            to="/"
            className="header-link"
            onClick={handleLogout}
        >
            Logout
        </Link>
        ) : (
        <Link to="/login" className="header-link">Login</Link>
        )}
        <span> | </span>
        <Link to="/design">Design</Link>
      </nav>
    </header>
  );
}

export default Header;