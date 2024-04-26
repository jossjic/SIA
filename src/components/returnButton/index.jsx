import React, { useState } from "react";
import "./returnButton.css";
import returnImage from "../../assets/img/returnImage.png";
import { useNavigate } from "react-router-dom";

export function ReturnButton({ textElement }) {
  const [color, setColor] = useState("#D9D9D9");
  let navigate = useNavigate();

  return (
    <div className="returnButtonContainer">
      <button
        className="returnButton"
        onClick={() => navigate(-1)}
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
