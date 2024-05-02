import React, { useState, useEffect } from "react";
import "./selectDate.css";
import { CadCheckCounter } from "../cadCheckCounter";
import { GeneralButton } from "../button";
import { barraBusqueda } from "../barraBusqueda";
import { StockBarDate } from "../stockBarDate";

export function SelectDate({ unit, amount, productId, onCancel, onConfirm }) {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    fetch(`http://3.20.237.82:3000/alimentos/atun/${productId}`)
      .then((response) => {
        console.log("Response status:", response.status);
        if (response.ok) {
          console.log("Response data:", response);
          return response.json();
        }
        throw new Error("Error al obtener las fechas");
      })
      .then((data) => {
        console.log("Data:", data);
        setDates(data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, [productId]); // Este efecto se ejecuta solo una vez al montar el componente

  /*
  const dates = [
    {id: 1, caducidad:"01/05/2002", stock:"NA"},
    {id: 2, caducidad:"08/07/2024", stock: 500}
];*/

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
                        {dates.map(date => (
                            <tr key={date.a_id}>
                            <td>{date.a_fechaCaducidad.substring(0,10)}</td>
                            <td><StockBarDate stock={date.a_stock}></StockBarDate></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
        </td>
      </table>  
    </div>
  );
}