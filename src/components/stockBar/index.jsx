import "./StockBar.css";
import { useState } from "react";

export function StockBar({ stock, isDisabled }) {
  const [currentStock, setCurrentStock] = useState(parseInt(stock));

  const handleChange = (event) => {
    const value = event.target.value;
    if (value === "") {
      setCurrentStock(0);
    } else {
      setCurrentStock(parseInt(value));
    }
  };

  const changeStock = (logic) => {
    if (logic && currentStock + 1 >= 0) {
      setCurrentStock(currentStock + 1);
    } else if (!logic && currentStock - 1 >= 0) {
      setCurrentStock(currentStock - 1);
    }
  };

  return (
    <>
      <img src="../../assets/img/calendarIcon.png" alt="Imagen" />
      <div class="texto-encima">{stock}</div>
      <div className="stockBar">
        <button onClick={() => changeStock(false)} disabled={isDisabled}>
          -
        </button>
        <input
          type="text"
          value={currentStock}
          onChange={handleChange}
          disabled={isDisabled}
        />
        <button onClick={() => changeStock(true)} disabled={isDisabled}>
          +
        </button>
      </div>
    </>
  );
}
