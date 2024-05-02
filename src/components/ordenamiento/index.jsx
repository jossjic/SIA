import React, { useState } from 'react';
import './ordenamiento.css';

export function Ordenamiento({message}) {
  const [circleColor, setCircleColor] = useState(false);

  const handleClick = () => {
    setCircleColor(!circleColor); // Cambiar el estado del color del círculo al hacer clic
  };

  return (
    <div className="rectangulo-azul">
      <a href="#" className="hipervinculo" onClick={handleClick}>{message}</a>
      <p
        className="circulo"
        style={{ backgroundColor: circleColor ? 'green' : 'rgb(190, 190, 190)'}}
      ></p>
    </div>
  );
}
