import React from "react";
import "./createUser.css";
import { CreateInput } from "../../components/createInput";
import { Guide } from "../../components/guide";
import { GeneralButton } from "../../components/button";

export const CreateUser = () => {
  return (
    <div className="createUser">
      <Guide message="No olvides llenar todos los campos para el registro" />
      <CreateInput />
      <GeneralButton textElement="Crear usuario" />
    </div>
  );
};
