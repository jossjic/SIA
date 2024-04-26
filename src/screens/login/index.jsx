import React from "react";
import "./login.css";
import { LogInput } from "../../components/logInput";
import { Guide } from "../../components/guide";
import { GeneralButton } from "../../components/button";

export const Login = () => {
  return (
    <div className="login">
      <Guide message="Bienvenid@ Por favor inicia sesión" />
      <LogInput />
      <GeneralButton textElement="Iniciar sesión" path="/mainPage" />
      <GeneralButton textElement="CheckDate Add" path="/checkDateAdd" />
      <GeneralButton textElement="CheckDate Delete" path="/checkDateDelete" />
    </div>
  );
};
