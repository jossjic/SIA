import React, { useState } from 'react';
import { Guide } from '../../components/guide';
import { GeneralButton } from '../../components/button';
import { ConfirmationPopUp } from "../../components/confirmationPopUp";
import "./NewPass.css";

export const NewPass = () => {
  return (
    <div className="new">
      <div className="mensaje"> 
        <Guide message="Ingresa la nueva contraseña" size={130}/>      
      </div>
      <div className='login-container'>
        <form className="logInput">
          <p>Nueva contraseña</p>
          <input type="password" />
          <p>Confirmar nueva contraseña</p>
          <input type="password" />
          <div className='buttonContainer'>
            <GeneralButton textElement="Confirmar" type="submit" color='#4FA725'/>
            <GeneralButton textElement="Cancelar" path="/login" />
          </div>
        </form>
      </div>
      {/* {isModalOpen && (
        <div className="modalOverlayConf">
          <ConfirmationPopUp message="Correo enviado con éxito." answer1="Ok" isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
        </div>
      )} */}
    </div>
  );
};