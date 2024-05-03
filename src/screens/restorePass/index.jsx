import React, { useState } from 'react';
import "./RestorePass.css";
import { Guide } from '../../components/guide';
import { GeneralButton } from '../../components/button';
import emailjs from 'emailjs-com';
import { ConfirmationPopUp } from "../../components/confirmationPopUp";
import { useNavigate } from 'react-router-dom';

export const RestorePass = () => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleOkClick = () => {
    setIsModalOpen(false);
    navigate("/codePage"); 
  };

  // función para generar un código aleatorio de 5 dígitos
  const generateRandomCode = () => {
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    return randomCode.toString(); 
  };

  // funcion para realizar la confirmacion del movimiento
  const handleRecoveryClick = async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe por defecto
    setErrorMessage('');

    if (!email || !confirmEmail) {
      setErrorMessage('Por favor completa todos los campos');
      return;
    }

    if (email !== confirmEmail) {
      setErrorMessage('Los correos electrónicos no coinciden');
      return;
    }

    const generatedCode = generateRandomCode(); 
    setCode(generatedCode); 

    const templateParams = {
      user_email: email,
      code: generatedCode, 
    };

    try {
      const response = await emailjs.send("service_touk674", "template_zisnua5", templateParams, "ItP7OTaI2vAb03jHA");
      console.log('Correo enviado con éxito:', response);
      setIsModalOpen(true); 
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      setErrorMessage('Error al enviar el correo');
    }
  };

  return (
    <div className="restore">
      <div className="mensaje"> 
        <Guide message="Bienvenid@ Introduce el correo electrónico de la cuenta para recuperarla" size={130}/>      
      </div>
      <div className='login-container'>
        <form className="logInput" onSubmit={handleRecoveryClick}>
          <p>Correo</p>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <p>Confirmar correo</p>
          <input type="email" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className='buttonContainer'>
            <GeneralButton textElement="Recuperar" type="submit" color='#4FA725'/>
            <GeneralButton textElement="Regresar" path="/login" />
          </div>
        </form>
      </div>
      {isModalOpen && (
        <div className="modalOverlayConf">
          <ConfirmationPopUp message="Correo enviado con éxito." answer1="Ok" isOpen={isModalOpen} closeModal={handleOkClick} />
        </div>
      )}
    </div>
  );
};