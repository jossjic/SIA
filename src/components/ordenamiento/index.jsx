import React, { useState } from 'react';
import './ordenamiento.css';

export function Ordenamiento() {
  const [circleColor, setCircleColor] = useState(false);

  const handleClick = () => {
    setCircleColor(!circleColor); // Cambiar el estado del color del círculo al hacer clic
  };

  return (
    <div className="rectangulo-azul">
      <a href="#" className="hipervinculo">Fecha de caducidad</a>
      <p
        className="circulo"
        style={{ backgroundColor: circleColor ? 'green' : 'rgb(190, 190, 190)', cursor: "pointer"}}
        onClick={handleClick}
      ></p>
    </div>
  );
}


