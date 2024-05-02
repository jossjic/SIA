import React, { useState, useEffect } from "react";
import { CreateInput } from "../../components/createInput";
import { Guide } from "../../components/guide";
import { GeneralButton } from "../../components/button";
import { ReturnButton } from "../../components/returnButton";
import "./EditUser.css";
import { TextInput } from "../../components/textInput";

export const EditUser = () => {

  return (
    <div className="editUser">
        <div className="editUserTitle">
            <Guide message="Asegúrate de rellenar todos los campos. <3"></Guide>
            <ReturnButton textElement="Editar Usuario"></ReturnButton>
        </div>

        <div className="editUserContainer">
            <div className="inputContainerEditUser">
                <TextInput
                    label="Nombre"
                    name="u_nombre"
                    // value={formData.u_id}
                    // onChange={handleChange}
                />
                <TextInput
                    label="Apellidos"
                    name="u_apellidos"
                />
                <TextInput
                    label="Correo"
                    name="u_email"
                    // value={formData.u_email}
                    // onChange={handleChange}
                />
                
            </div>
            <GeneralButton
                textElement="Editar"
                color="#5982C0"
                // onClick={handleSubmit}
            ></GeneralButton>
        </div>
    </div>
  );
}
