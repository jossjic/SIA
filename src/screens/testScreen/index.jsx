import { useState, useEffect } from "react";
import "./TestScreen.css";
import { RowAdminPage } from "../../components/rowAdminPage";

export const TestScreen = () => {
  const [alimentos, setAlimentos] = useState([]);

  useEffect(() => {
    fetch("http://18.191.224.71:3000/alimentos")
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
  }, []); // Este efecto se ejecuta solo una vez al montar el componente

  return (
    <div className="testScreen">
      {alimentos.map((alimento) => (
        <RowAdminPage
          id={alimento.a_id}
          product={alimento.a_nombre}
          amount={alimento.a_cantidad}
          unit={alimento.um_id}
          brand={alimento.m_id}
          stock={alimento.a_stock}
          cadDate={alimento.a_fechaCaducidad}
        />
      ))}
    </div>
  );
};
