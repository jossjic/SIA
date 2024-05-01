import React, { useState, useEffect } from "react";
import "./selectDate.css";
import { CadCheckCounter } from "../cadCheckCounter";
import { GeneralButton } from "../button";
import { barraBusqueda } from "../barraBusqueda";
import { StockBarDate } from "../stockBarDate";

export function SelectDate({ unit, amount, onCancel, onConfirm, productId }) {
  //const [dates, setDates] = useState([]);

  
  const dates = [
    {id: 1, caducidad:"01/05/2002", stock:"NA"},
    {id: 2, caducidad:"08/07/2024", stock: 500}
];

  return (
    <div className="checkCard_selectDate">
      <table className="generalTable">
        <td>
          <tr>
            <CadCheckCounter unit={unit} amount={amount}></CadCheckCounter>
          </tr>
          <tr>
            <GeneralButton textElement="Confirmar" onClick={onConfirm} color="#4FA725"></GeneralButton>
          </tr>
          <tr>
            <GeneralButton textElement="Cancelar" onClick={onCancel} color="#E14040"></GeneralButton>
          </tr>
          <tr>
            <GeneralButton textElement="Agregar Caducidad" path="" color="#5982C0"></GeneralButton> 
          </tr>
        </td>
        <td>
          <table className="productsTable">
                        <thead>
                            <th>Caducidad</th>
                            <th>Cantidad Seleccionada</th>
                        </thead>
                        <tbody>
                        {dates.map((date) => (
                            <tr key={date.id}>
                            <td>{date.caducidad.substring(0,10)}</td>
                            <td><StockBarDate stock={date.stock}></StockBarDate></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
        </td>
      </table>  
    </div>
  );
}