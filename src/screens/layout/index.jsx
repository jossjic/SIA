import React from "react";
import "./layout.css";
import { CadCheckCounter } from "../../components/cadCheckCounter";
import { ReturnButton } from "../../components/returnButton";
import { ConfirmationPopUp } from "../../components/confirmationPopUp";
import { GeneralButton } from "../../components/button";
import { LogInput } from "../../components/logInput";
import { Ordenamiento } from "../../components/ordenamiento";

export const Layout = () => {
  return (
    <div>
      <CadCheckCounter unit="test" amount="1" />
      <CadCheckCounter unit="test2" amount="21323" />
      <ReturnButton textElement="" />
      <ReturnButton textElement="Agregar Producto Existente" />
      <ConfirmationPopUp
        message="¿Está seguro de que quiere eliminar estos alimentos?"
        answer1="Cancelar"
        answer2="Eliminar"
      />
      <GeneralButton textElement="Agregar" />
      <Ordenamiento />
      <LogInput></LogInput>
      

    </div>
  );
};
