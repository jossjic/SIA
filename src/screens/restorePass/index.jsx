import React from 'react';
import "./restorePass.css";
import { LogInput } from '../../components/logInput';
import { Guide } from '../../components/guide';
import { GeneralButton } from '../../components/button';

export const RestorePass = () => {

  return (
    <div className="login">
      <div className="mensaje"> 
        <Guide message="Bienvenid@ Introduce el correo elctrónico de la cuenta para recuperarla" size={130}/>      
      </div>
      <div className='login-container'>
        <LogInput />
        <div className='buttonContainer'>
          <GeneralButton textElement="Recuperar" path="/login" color='#4FA725'/>
          <GeneralButton textElement="Regresar" path="/login" />
        </div>
        
      </div>
    </div>
  );
};