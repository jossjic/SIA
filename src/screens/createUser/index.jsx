import React, { useState } from "react";
import "./createUser.css";
import { CreateInput } from "../../components/createInput";
import { Guide } from "../../components/guide";
import { GeneralButton } from "../../components/button";
import { ConfirmationPopUp } from "../../components/confirmationPopUp";
import { useNavigate } from 'react-router-dom';

export const CreateUser = () => {
  const [formData, setFormData] = useState({
    u_id: "",
    u_nombre: "",
    u_apellidos: "",
    u_email: "",
    u_contraseña: "",
    u_rol: 0,
  });
  const [error, setError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async () => {
    try {
      // Verificar campos obligatorios
      if (
        !formData.u_id ||
        !formData.u_nombre ||
        !formData.u_apellidos ||
        !formData.u_email ||
        !formData.u_contraseña
      ) {
        throw new Error("Por favor, complete todos los campos obligatorios.");
      }

      const response = await fetch("http://3.144.175.151:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Error al agregar el usuario");
      }
      // Manejar el éxito de la inserción
      setRegistrationSuccess(true);
      console.log("Usuario agregado correctamente");
    } catch (error) {
      setError(error.message);
      console.error("Error al agregar el usuario:", error);
    }
    setIsModalOpen(true);
  };

  return (
    <div className="createUser">
      <div className="mensaje">
        <Guide message="No olvides llenar todos los campos para el registro" />
        
      </div>
      
      <div className="createUser-container">
        <br />
        <div className="createInput">
          <p>Nombre de usuario</p>
          <input
            name="u_id"
            value={formData.u_id}
            type="text"
            onChange={handleChange}
          />
          <p>Nombre</p>
          <input
            name="u_nombre"
            value={formData.u_nombre}
            type="text"
            onChange={handleChange}
          />
          <p>Apellidos</p>
          <input
            name="u_apellidos"
            value={formData.u_apellidos}
            type="text"
            onChange={handleChange}
          />
          <p>Correo</p>
          <input
            name="u_email"
            value={formData.u_email}
            type="email"
            onChange={handleChange}
          />
          <p>Contraseña</p>
          <input
            name="u_contraseña"
            value={formData.u_contraseña}
            type="password"
            onChange={handleChange}
          />
        </div>
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <GeneralButton textElement="Crear usuario" onClick={handleSubmit} />
        {registrationSuccess && (
          <p style={{ color: "green" }}>Registro exitoso</p>
        )}
      </div>
      {isModalOpen && (
        <div className="modalOverlayConf">
        <ConfirmationPopUp
        message="Usuario registrado correctamente"
        answer1="Ok" 
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)} /> 
      </div> )}
    </div>
  );
};