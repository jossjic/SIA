import React from "react";
import "./adminPage.css";
import { Guide } from "../../components/guide";
import { ReturnButton } from "../../components/returnButton";

export const AdminPage = () => {
  return (
    <div>
      <div className="buttonTopLeft">
        <ReturnButton></ReturnButton>
      </div>
      <div className="adminPage">
        <Guide
          message="Estas viendo los alimentos relacionados a este usuario, puedes agregar,
         eliminar, editar y crear nuevos alimentos desde esta ventana."
          size={80}
        />
        <div className="square"></div>
      </div>
    </div>
  );
};
