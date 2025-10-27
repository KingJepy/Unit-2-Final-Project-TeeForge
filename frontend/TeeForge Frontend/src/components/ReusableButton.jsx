import React from "react";
import './ReusableButton.css';

function MyButton({ label, onClick, type = "button", className = ""}) {
    return (
        <button type={type} onClick={onClick} className={`reusable-button ${className}`}>
            {label}
        </button>
    );
}

export default MyButton;