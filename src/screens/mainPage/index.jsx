import React from "react";
import "./mainPage.css";
import { Guide } from "../../components/guide";
import { GeneralButton } from "../../components/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmationPopUp } from "../../components/confirmationPopUp";

export const MainPage = () => {
  const [alimentos, setAlimentos] = useState([]);

  //Funcion para cargar los datos de la db
  useEffect(() => {
    // Arreglo temporal para almacenar los alimentos de dos peticiones
    let tempAlimentos = [];
    // Primera petición
    fetch("http://3.144.175.151:3000/alimentos/caducados/dCad")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error al obtener los alimentos caducados");
      })
      .then((data) => {
        // Mapear los alimentos y agregarles el estatus
        const alimentosCaducados = data.map((alimento) => ({
          ...alimento,
          estatus: "Caducado",
        }));
        // Agregar los alimentos caducados al arreglo temporal
        tempAlimentos = [...tempAlimentos, ...alimentosCaducados];
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });

    // Segunda petición
    fetch("http://3.144.175.151:3000/alimentos/proximoscaducados/dCad")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error al obtener los alimentos próximos a caducar");
      })
      .then((data) => {
        // Mapear los alimentos y agregarles el estatus
        const alimentosProximosCaducar = data.map((alimento) => ({
          ...alimento,
          estatus: "Por caducar",
        }));
        // Agregar los alimentos próximos a caducar al arreglo temporal
        tempAlimentos = [...tempAlimentos, ...alimentosProximosCaducar];
        // Actualizar el estado alimentos con los datos combinados
        setAlimentos(tempAlimentos);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    if (dateString === "0000-00-00") {
      return "Sin fecha";
    }
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Función para cambiar color del estatus en el estilo
  const getClassForEstatus = (estatus) => {
    const className = estatus.replace(/\s+/g, "-").toLowerCase();
    return `${className}`;
  };

  const navigate = useNavigate();
  const handleClick = () => navigate("/restorePass");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="mainP">
      <div className="mensaje">
        <Guide
          message="Bienvenid@ Estos alimentos son los próximos a caducar."
          size={130}
        />
      </div>
      <div className="als">
        <table className="alTable">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Marca</th>
              <th>Estatus</th>
              <th>Fecha caducidad próxima</th>
            </tr>
          </thead>
          <tbody>
            {alimentos.map((alimento) => (
              <tr key={alimento.id}>
                <td>{alimento.a_nombre}</td>{" "}
                <td>{alimento.m_nombre || "Sin marca"}</td>
                <td className={getClassForEstatus(alimento.estatus)}>
                  {alimento.estatus}
                </td>
                <td>{formatDate(alimento.a_fechaCaducidad)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="buttonContainer">
        <GeneralButton textElement="Administrar alimentos" path="/adminPage" />
        <GeneralButton
          textElement="Administrar usuarios"
          path="/adminUserPage"
        />
        <GeneralButton
          textElement="Cerrar sesión"
          onClick={() => setIsModalOpen(true)}
          color="red"
        />
      </div>
      {isModalOpen && (
        <div className="modalOverlayConf">
          <ConfirmationPopUp
            message="¿Seguro que quieres cerrar sesión?"
            answer1="Si"
            answer2="No"
            path1="/login"
            isOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
};
