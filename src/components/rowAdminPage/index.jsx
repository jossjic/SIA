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
}) {
  const [isChecked, setIsChecked] = useState(selectedIds.includes(id));

  useEffect(() => {
    setIsChecked(selectedIds.includes(id)); // Actualiza 'isChecked' cuando 'selectedIds' cambie
  }, [selectedIds]);

  const quantity = `${amount} ${unit}`;

  const rowClass = isChecked ? "rowAdminPage rowChecked" : "rowAdminPage";

  const handleCheckboxChange = (event) => {
    onChange(event, id); // Llamar a la función de onChange del componente padre
  };

  return (
    <div className={rowClass}>
      <input
        className="checkBox"
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        disabled={stock === 0 || stock === "0" ? true : false}
      />
      <Link
        className="productLink"
        to={"/editProduct/" + id}
        style={{ textDecoration: "none" }}
      >
        <p className="product">{product}</p>
      </Link>
      <p className="quantity">{quantity}</p>
      <p className="brand">{brand}</p>
      <StockBar stock={stock} isDisabled={isChecked} />
      <p className="cadDate">
        {cadDate == null ? "Sin Caducidad" : formatDate(cadDate)}
      </p>
    </div>
  );
}
