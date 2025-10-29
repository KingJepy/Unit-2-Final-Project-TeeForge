import React from "react";
import './Footer.css'

function Footer () {
    return (
        <footer className="footer">
            <p className="feet">TeeForge </p>
            <p className="feet">  |  </p>
            <p className="feet">All rights reserved</p>
            <p className="feet"> | </p>
            <a href="/about" className="feet"> About </a>
        </footer>
    );
};

export default Footer;