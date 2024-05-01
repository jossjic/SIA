import { Guide } from "../../components/guide";
import { ReturnButton } from "../../components/returnButton";
import { useState, useEffect } from "react";
import "./AdminPage.css";
import { RowAdminPage } from "../../components/rowAdminPage";

export const AdminPage = () => {
  const [alimentos, setAlimentos] = useState([]);

  useEffect(() => {
    fetch("http://3.20.237.82:3000/alimentos/join/marca")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error al obtener los usuarios");
      })
      .then((data) => {
        console.log("Alimentos:", data);
        setAlimentos(data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);

  return (
    <div className="adminPage">
      <ReturnButton></ReturnButton>

      <Guide
        message="Estas viendo los alimentos relacionados a este usuario, puedes agregar,
         eliminar, editar y crear nuevos alimentos desde esta ventana."
        size={80}
        className="guide"
      />
      <div className="alimentosBox">
        {alimentos.map((alimento) => (
          <RowAdminPage
            id={alimento.a_id}
            product={alimento.a_nombre}
            amount={alimento.a_cantidad}
            unit={alimento.um_id}
            brand={alimento.m_nombre}
            stock={alimento.a_stock}
            cadDate={alimento.a_fechaCaducidad}
            key={alimento.a_id}
          />
        ))}
      </div>

      <div className="paginacion">
        <button className="anterior"></button>
        <input type="text" className="paginacionField" />
        <button className="siguiente"></button>
      </div>
    </div>
  );
};
