import React from "react";
import homePageImage from "../assets/homePageImage.jpg";
import "./HomePage.css"
import { Link } from "react-router-dom";

function HomePage () {
    return (
        <div className="homePage">
            <div className="HomeLeft">
                <div className="home-text">
                    <p>
                        Welcome to the TeeForge! Where you can create your own custom Tee designs and we bring them to life.
                    </p>
                </div>
                <div className="design-link">
                    <Link to='/design'>Start Your Design</Link>
                </div>
            </div>
            
            <img src={homePageImage} alt="Shirt Rack" />
        </div>
    );
};

export default HomePage;