import "./StockBar.css";
import { useState, useEffect } from "react";
import cloudIcon from "../../assets/img/cloudIcon.png";

export function StockBar({ stock, isDisabled }) {
  const [currentStock, setCurrentStock] = useState(parseInt(stock));
  const [stockChanged, setStockChanged] = useState(false);

  useEffect(() => {
    stockCheck();
  }, [currentStock]); // Se ejecutará cada vez que currentStock cambie

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

  const stockCheck = () => {
    if (currentStock === parseInt(stock)) {
      setStockChanged(false);
    } else {
      setStockChanged(true);
    }
  };

  return (
    <div className="stockBar">
      <div className={"cloud" + (stockChanged && !isDisabled ? "" : " hide")}>
        <img
          className="cloudIcon"
          src={cloudIcon}
          alt="cloudIcon"
          disabled={isDisabled}
        />
        <p className="cloudText" disabled={isDisabled}>
          {stock}
        </p>
      </div>
      <button onClick={() => changeStock(false)} disabled={isDisabled}>
        -
      </button>
      <input
        type="text"
        value={isDisabled ? stock : currentStock}
        onChange={handleChange}
        disabled={isDisabled}
      />
      <button onClick={() => changeStock(true)} disabled={isDisabled}>
        +
      </button>
    </div>
  );
}
