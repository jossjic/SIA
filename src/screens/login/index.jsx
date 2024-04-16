import React from 'react';
import "./login.css";
import { LogInput } from '../../components/logInput';
import { InfoBanner } from '../../components/guide';
import { GeneralButton } from '../../components/button';

export const Login = () => {

  return (
    <div className="login">
      <InfoBanner message="Bienvenid@ Por favor inicia sesión" />
      <LogInput />
      <GeneralButton textElement="Iniciar sesión" path="/mainPage" />
    </div>
  );
};