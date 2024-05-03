import React, {useState} from "react";
import "./selectDate.css";
import { CadCheckCounter } from "../cadCheckCounter";
import { GeneralButton } from "../button";
import { CalendarInputDate } from "../../components/calendarInputDate";
import { barraBusqueda } from "../barraBusqueda";
import { StockBarDate } from "../stockBarDate";
import { formatDate } from "../../generalFunctions";

export function SelectDate({ unit, amount, dates, onCancel, onConfirm }) {

  const [formData, setFormData] = useState({
    a_nombre: dates[0].a_nombre,
    a_cantidad: dates[0].a_cantidad,
    a_stock: 0,
    a_fechaSalida: null,
    a_fechaEntrada: formatDate(new Date()),
    a_fechaCaducidad: null,
    um_id: dates[0].um_id,
    m_id: dates[0].m_id,
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(a_fechaCaducidad);
  };

  const handleSubmit = async () => {
    try {
      console.log(formData);
      const response = await fetch("http://3.20.237.82:3000/alimentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Error al agregar el alimento");
      }
      // Manejar el éxito de la inserción
      console.log("Alimento agregado correctamente");
    } catch (error) {
      console.error("Error al agregar el alimento:", error);
    }
  };

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
            <div className="calendarID">
              <CalendarInputDate
                name="a_fechaCaducidad"
                value={formData.a_fechaCaducidad}
                onChange={handleChange}
              />
            </div>
          </tr>
          <tr>
            <GeneralButton textElement="Agregar Caducidad" onClick={handleSubmit} color="#5982C0"></GeneralButton> 
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