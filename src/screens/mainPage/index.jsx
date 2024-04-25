import React from "react";
import "./mainPage.css";
import { Guide } from "../../components/guide";
import { GeneralButton } from "../../components/button";

export const MainPage = () => {
  return (
    <div className="main">
      <Guide message="Bienvenid@ Estos alimentos son los próximos a caducar." />
      <div className="square"></div>
      <div className="buttonContainer">
        <GeneralButton textElement="Administrar alimentos" path="/adminPage" />
        <GeneralButton
          textElement="Administrar usuarios"
          path="/adminUserPage"
        />
        <GeneralButton textElement="Cerrar sesión" path="/layout" color="red" />
      </div>
    </div>
  );
};
