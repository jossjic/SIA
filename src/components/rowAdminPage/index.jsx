import React, { useState } from "react";
import "./RowAdminPage.css";

export function RowAdminPage({ product, amount, unit, brand, stock, cadDate }) {
  const quantity = amount + " " + unit;
  // Declarar el estado inicial
  const [currentStock, setCurrentStock] = useState(parseInt(stock));

  const handleChange = (event) => {
    // Obtener el valor del input
    const value = event.target.value;

    // Actualizar el estado usando setCurrentStock
    if (value === "") {
      // Si la cadena está vacía, establecer el stock en 0
      setCurrentStock(0);
    } else {
      // Convertir el valor a un número y establecer el stock
      setCurrentStock(parseInt(value));
    }
  };

  const changeStock = (logic) => {
    // Actualizar el estado usando setCurrentStock
    if (logic && currentStock + 1 >= 0) {
      setCurrentStock(currentStock + 1);
    } else if (!logic && currentStock - 1 >= 0) {
      setCurrentStock(currentStock - 1);
    }
  };

  return (
    <div className="rowAdminPage">
      <input className="checkBox" type="checkbox"></input>
      <p>{product}</p>
      <p>{quantity}</p>
      <p>{brand}</p>
      <div className="stockBar">
        {/* Pasamos una función callback para onClick */}
        <button onClick={() => changeStock(false)}>-</button>
        <input type="text" value={currentStock} onChange={handleChange}></input>
        {/* Pasamos una función callback para onClick */}
        <button onClick={() => changeStock(true)}>+</button>
      </div>
      <p>{cadDate}</p>
    </div>
  );
}
