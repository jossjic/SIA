import React from 'react';
import "./login.css";
import { LogInput } from '../../components/logInput';
import { InfoBanner } from '../../components/guide';
import { GeneralButton } from '../../components/button';
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate('/restorePass'); 

  return (
    <div className="login">
      <InfoBanner message="Bienvenid@ Por favor inicia sesión" size={100}/>
      <div className='login-container'>
        <LogInput />
        <p className="forgotPassword" onClick={handleClick}>¿Olvidaste la contraseña?</p>
        <GeneralButton textElement="Iniciar sesión" path="/mainPage" />
      </div>
    </div>
  );
};