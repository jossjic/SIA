import React from "react";
import "./selectDateDelete.css";
import { CadCheckCounter } from "../cadCheckCounter";
import { GeneralButton } from "../button";
import { barraBusqueda } from "../barraBusqueda";
import { StockBarDate } from "../stockBarDate";

export function SelectDateDelete({ unit, amount, onCancel }) {
  const dates = [
    {id: 1, caducidad:"01/05/2002", stock:"NA"},
    {id: 2, caducidad:"08/07/2024", stock: 500}
];

  return (
    <div className="checkCard_selectDateD">
      <table className="generalTableD">
        <td>
          <tr>
            <CadCheckCounter unit="test" amount="1"></CadCheckCounter>
          </tr>
          <tr>
            <GeneralButton textElement="Confirmar" path="" color="#4FA725"></GeneralButton>
          </tr>
          <tr>
            <GeneralButton textElement="Cancelar" onClick={onCancel} color="#E14040"></GeneralButton>
          </tr>
        </td>
        <td>
          <table className="productsTableD">
                        <thead>
                            <th></th>
                            <th>Caducidad</th>
                            <th>Cantidad</th>
                            <th>Cantidad Seleccionada</th>
                        </thead>
                        <tbody>
                        {dates.map(date => (
                            <tr key={date.id}>
                                <td><input type="checkbox" className="checkboxLargeD" /></td>
                                <td>{date.caducidad}</td>
                                <td>{date.stock}</td>
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