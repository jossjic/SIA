import React, { useState, useEffect } from "react";
import { StockBar } from "../stockBar";
import { Link } from "react-router-dom";
import { formatDate } from "../../generalFunctions";
import "./RowAdminPage.css";

export function RowAdminPage({
  id,
  product,
  amount,
  unit,
  brand,
  stock,
  cadDate,
  onChange,
  selectedIds,
  modificationMap,
  setModificationMap,
  savedChanges,
  setSavedChanges,
  stockResetId,
  showWithoutStock,
}) {
  const [isChecked, setIsChecked] = useState(selectedIds.includes(id));
  const [resetCheckbox, setResetCheckbox] = useState(false);

  useEffect(() => {
    setIsChecked(selectedIds.includes(id)); // Actualiza 'isChecked' cuando 'selectedIds' cambie
  }, [selectedIds]);

  //checkbox refresh stock from 0 to n

  const quantity = `${amount} ${unit}`;

  const rowClass =
    !showWithoutStock && stock === 0
      ? "rowAdminPage hidden"
      : isChecked
      ? "rowAdminPage rowChecked"
      : "rowAdminPage";

  const handleCheckboxChange = (event) => {
    onChange(event, id); // Llamar a la función de onChange del componente padre
  };

  return (
    <div className={rowClass}>
      <div className="rowAdminPage__buttons">
        <button className="addDifferentCad">+</button>
        <input
          className="checkBox"
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          disabled={stock === 0}
        />
      </div>

      <Link
        className="productLink"
        to={"/editProduct/" + id}
        style={{ textDecoration: "none" }}
      >
        <p className="product">{product}</p>
      </Link>
      <p className="quantity">{quantity}</p>
      <p className="brand">{brand}</p>
      <StockBar
        className="stockBar"
        id={id}
        stock={stock}
        isDisabled={isChecked}
        modificationMap={modificationMap}
        setModificationMap={setModificationMap}
        savedChanges={savedChanges}
        setSavedChanges={setSavedChanges}
        stockResetId={stockResetId}
      />
      <p className="cadDate">
        {cadDate == null ? "Sin Caducidad" : formatDate(cadDate)}
      </p>
    </div>
  );
}
