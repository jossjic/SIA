import React, { useState, useEffect } from "react";
import { CreateInput } from "../../components/createInput";
import { useParams } from "react-router-dom";
import { Guide } from "../../components/guide";
import { GeneralButton } from "../../components/button";
import { ReturnButton } from "../../components/returnButton";
import "./EditUser.css";
import { TextInput } from "../../components/textInput";



export const EditUser = () => {

    const {u_id} = useParams();
    const [formData, setFormData] = useState({
       u_nombre : "",
       u_apellidos: "",
       u_email: "",
       u_contraseña: "",
       u_rol: 0,
    });


useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`http://3.144.175.151:3000/usuarios/${u_id}`);
        const userData = await response.json();
        setFormData({
          u_nombre: userData.u_nombre,
          u_apellidos: userData.u_apellidos,
          u_email: userData.u_email,
          u_contraseña: userData.u_contraseña,
          u_rol: userData.u_rol,
        });
        console.log(userData);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }
    fetchUserData();
  }, [u_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
     ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log(formData);
      const response = await fetch(`http://3.144.175.151:3000/usuarios/${u_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Error al editar el usuario");
      }
      // Manejar el éxito de la edición
      console.log("Usuario editado correctamente");
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al editar el usuario:", error);
    }
  };

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
                    value={formData.u_nombre}
                    onChange={handleChange}
                />
                <TextInput
                    label="Apellidos"
                    name="u_apellidos"
                    value={formData.u_apellidos}
                    onChange={handleChange}
                />
                <TextInput
                    label="Correo"
                    name="u_email"
                    value={formData.u_email}
                    onChange={handleChange}
                />
                
            </div>
            <GeneralButton
                textElement="Editar"
                color="#5982C0"
                onClick={handleSubmit}
            ></GeneralButton>
        </div>
    </div>
  );
}
