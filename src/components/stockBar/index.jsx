import "./StockBar.css";
import { useState, useEffect } from "react";
import cloudIcon from "../../assets/img/cloudIcon.png";

export function StockBar({
  stock,
  isDisabled,
  modificationMap,
  setModificationMap,
  savedChanges,
  setSavedChanges,
  id,
  stockResetId,
  color,
  setColor,
}) {
  const [currentStock, setCurrentStock] = useState(parseInt(stock));
  const [stockChanged, setStockChanged] = useState(false);
  const [initialStock, setInitialStock] = useState(parseInt(stock));

  useEffect(() => {
    // Cargar datos guardados al montar el componente
    const savedModificationMap = localStorage.getItem("modificationMap");
    if (savedModificationMap) {
      setModificationMap(JSON.parse(savedModificationMap));
    }
  }, []);

  useEffect(() => {
    stockCheck();
  }, [currentStock]);

  useEffect(() => {
    if (stockResetId === id) {
      setCurrentStock(parseInt(stock));
      setStockChanged(false);
    }
  }, [stockResetId]);

  useEffect(() => {
    if (savedChanges) {
      setInitialStock(currentStock); // Guardar el stock actual como el nuevo stock inicial
      setStockChanged(false);
      setSavedChanges(false);
    }
  }, [savedChanges, currentStock]);

  useEffect(() => {
    // Guardar modificationMap en localStorage cada vez que cambie
    localStorage.setItem("modificationMap", JSON.stringify(modificationMap));
    if (modificationMap[id]) {
      if (modificationMap[id][0] > modificationMap[id][1]) {
        setColor("red");
      } else {
        setColor("green");
      }
    } else {
      setColor("black");
    }
  }, [modificationMap]);

  useEffect(() => {
    // Cuando el componente se monta o el stock inicial cambia
    setCurrentStock(parseInt(stock));
    setInitialStock(parseInt(stock));
  }, [stock]);

  const handleChange = (event) => {
    const value = event.target.value;
    if (value === "") {
      setCurrentStock(0);
    } else if (value.length > 4) {
      setCurrentStock(9999);
    } else if (isNaN(value)) {
      setCurrentStock(parseInt(initialStock));
    } else {
      setCurrentStock(parseInt(value));
    }
    setStockChanged(true);
  };

  const changeStock = (logic) => {
    if (logic && currentStock + 1 >= 0) {
      setCurrentStock(currentStock + 1);
    } else if (!logic && currentStock - 1 >= 0) {
      setCurrentStock(currentStock - 1);
    }
    setStockChanged(true);
  };

  const stockCheck = () => {
    if (currentStock === parseInt(initialStock)) {
      setStockChanged(false);
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
      <div className={"cloud" + (modificationMap[id] ? "" : " hide")}>
        <img
          className="cloudIcon"
          src={cloudIcon}
          alt="cloudIcon"
          disabled={isDisabled}
        />
        <p className="cloudText" disabled={isDisabled}>
          {modificationMap[id] ? modificationMap[id][0] : initialStock}
        </p>
      </div>
      <button onClick={() => changeStock(false)} disabled={isDisabled}>
        -
      </button>
      <input
        style={{ color: color }}
        type="text"
        value={
          stockChanged
            ? currentStock
            : modificationMap[id]
            ? modificationMap[id][1]
            : initialStock
        }
        onChange={handleChange}
        disabled={isDisabled}
      />
      <button onClick={() => changeStock(true)} disabled={isDisabled}>
        +
      </button>
    </div>
  );
}
