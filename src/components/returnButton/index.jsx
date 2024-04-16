import React, { useState } from "react";
import "./returnButton.css";
import returnImage from "../../assets/img/returnImage.png";

export function ReturnButton({ textElement }) {
  const [color, setColor] = useState("#D9D9D9");

  const cambiarColor = () => {
    const nuevoColor = color === "#D9D9D9" ? "red" : "#D9D9D9";
    setColor(nuevoColor);
  };

  return (
    <div>
      <button
        className="returnButton"
        onClick={cambiarColor}
        style={{
          backgroundColor: color,
          color: "white",
          padding: "10px 20px",
          border: "none",
          cursor: "pointer",
        }}
      >
        <img src={returnImage} />
      </button>
      <p className="returnP">{textElement}</p>
    </div>
  );
}
