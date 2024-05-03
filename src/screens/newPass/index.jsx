import React, { useState } from 'react';
import { Guide } from '../../components/guide';
import { GeneralButton } from '../../components/button';
import { ConfirmationPopUp } from "../../components/confirmationPopUp";
import "./NewPass.css";
import { useNavigate } from 'react-router-dom';

export const NewPass = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      // Si las contraseñas no coinciden, muestra un mensaje de error o algo similar
      alert("Las contraseñas no coinciden");
      return;
    }

    // Aquí puedes agregar lógica adicional para enviar las contraseñas al servidor o almacenarlas localmente

    // Después de confirmar la actualización de la contraseña, mostramos el modal
    setIsModalOpen(true);
  };

  const handleOkClick = () => {
    // Aquí puedes agregar lógica adicional si es necesario antes de redirigir a la página de inicio de sesión
    setIsModalOpen(false);
    navigate("/login"); // Redirige a la página de inicio de sesión
  };

  return (
    <div className="new">
      <div className="mensaje"> 
        <Guide message="Ingresa la nueva contraseña" size={130}/>      
      </div>
      <div className='login-container'>
        <form className="logInput" onSubmit={handleSubmit}>
          <p>Nueva contraseña</p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <p>Confirmar nueva contraseña</p>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <div className='buttonContainer'>
            <GeneralButton textElement="Confirmar" type="submit" color='#4FA725'/>
            <GeneralButton textElement="Cancelar" path="/login" />
          </div>
        </form>
      </div>
      {isModalOpen && (
        <div className="modalOverlayConf">
          <ConfirmationPopUp message="Contraseña actualizada." answer1="Ok" isOpen={isModalOpen} closeModal={handleOkClick} />
        </div>
      )}
    </div>
  );
};
