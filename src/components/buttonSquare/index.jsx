import React from "react";
import "./buttonSquare.css";

export function ButtonSquare({ textElement, onClick, color = "#5982C0" }) {
    const buttonStyle = {
        backgroundColor: color
    };

    return (
        <button className="acc" style={buttonStyle} onClick={onClick}>
            {textElement}
        </button>
    );
}

export function ButtonCircle({ textElement, onClick, color = "#5982C0" }) {
    const buttonStyle = {
        backgroundColor: color
    };

    return (
        <button className="accC" style={buttonStyle} onClick={onClick}>
            {textElement}
        </button>
    );
}