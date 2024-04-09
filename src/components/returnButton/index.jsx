import React, { useState } from "react";
import "./returnButton.css";
import returnImage from "../../assets/img/returnImage.png";

export function ReturnButton() {
  const [color, setColor] = useState("blue");

  const cambiarColor = () => {
    const nuevoColor = color === "#D9D9D9" ? "red" : "#D9D9D9";
    setColor(nuevoColor);
  };

  return (
    <button
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
  );
}
