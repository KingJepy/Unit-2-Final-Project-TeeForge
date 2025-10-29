import React from "react";
import './Header.css';

function Header () {
    return (
        <header className="header">
            <h1 className="nameInHeader">TeeForge</h1>
            <nav className="headerLinks">
                <a href="/">Home</a>
                <a> | </a>
                <a href="/login">Login</a>
                <a> | </a>
                <a href="/design">Design</a>
            </nav>
        </header>
    );
};

export default Header;