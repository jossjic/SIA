import React, { useState } from "react";
import { StockBar } from "../stockBar";
import "./RowAdminPage.css";

export function RowAdminPage({
  id,
  product,
  amount,
  unit,
  brand,
  stock,
  cadDate,
}) {
  const fecha = new Date(cadDate);
  const [isChecked, setIsChecked] = useState(false);

  const year = fecha.getFullYear();
  const month = fecha.getMonth() + 1; // getMonth returns month index starting from 0
  const day = fecha.getDate();

  // Format the date in YYYY/MM/DD
  const formattedDate = `${year}/${month.toString().padStart(2, "0")}/${day
    .toString()
    .padStart(2, "0")}`;

  const quantity = `${amount} ${unit}`;

  const rowClass = isChecked ? "rowAdminPage rowChecked" : "rowAdminPage";

  return (
    <div className={rowClass}>
      <input
        className="checkBox"
        type="checkbox"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <p className="product">{product}</p>
      <p className="quantity">{quantity}</p>
      <p className="brand">{brand}</p>
      <StockBar stock={stock} isDisabled={isChecked} />
      <p className="cadDate">{formattedDate}</p>
    </div>
  );
}
