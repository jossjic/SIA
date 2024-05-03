import React, { useState, useEffect } from "react";
import { StockBar } from "../stockBar";
import { Link } from "react-router-dom";
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
  const fecha = new Date(cadDate);
  const [isChecked, setIsChecked] = useState(selectedIds.includes(id));

  useEffect(() => {
    setIsChecked(selectedIds.includes(id)); // Actualiza 'isChecked' cuando 'selectedIds' cambie
  }, [selectedIds]);

  const year = fecha.getFullYear();
  const month = fecha.getMonth() + 1; // getMonth returns month index starting from 0
  const day = fecha.getDate();

  // Format the date in YYYY/MM/DD
  const formattedDate = `${year}/${month.toString().padStart(2, "0")}/${day
    .toString()
    .padStart(2, "0")}`;

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
      <p className="cadDate">{formattedDate}</p>
    </div>
  );
}
