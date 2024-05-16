import "./StockBar.css";
import { useState, useEffect } from "react";
import cloudIcon from "../../assets/img/cloudIcon.png";
import { set } from "date-fns";

export function StockBar({
  stock,
  isDisabled,
  modificationMap,
  setModificationMap,
  savedChanges,
  setSavedChanges,
  id,
  stockResetId,
}) {
  const [currentStock, setCurrentStock] = useState(parseInt(stock));
  const [stockChanged, setStockChanged] = useState(false);
  const [initialStock, setInitialStock] = useState(stock);

  useEffect(() => {
    stockCheck();
  }, [currentStock]); // Se ejecutará cada vez que currentStock cambie

  useEffect(() => {
    if (stockResetId === id) {
      setCurrentStock(parseInt(stock));
      setStockChanged(false);
    }
  }, [stockResetId]); // Se ejecutará cada vez que stockResetId cambie

  useEffect(() => {
    if (savedChanges) {
      setStockChanged(false);
      setSavedChanges(false);
      setInitialStock(currentStock);
    }
  }, [savedChanges]); // Se ejecutará cada vez que

  const handleChange = (event) => {
    const value = event.target.value;
    if (value === "") {
      setCurrentStock(0);
    } //limite int max
    else if (value.length > 4) {
      setCurrentStock(9999);
    } else if (isNaN(value)) {
      setCurrentStock(parseInt(initialStock));
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
    if (currentStock === parseInt(initialStock)) {
      setStockChanged(false);
      setModificationMap((prevMap) => {
        const newMap = { ...prevMap };
        delete newMap[id];
        return newMap;
      });
    } else {
      setStockChanged(true);
      setModificationMap((prevMap) => ({
        ...prevMap,
        [id]: [parseInt(initialStock), parseInt(currentStock)],
      }));
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
          {initialStock}
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
