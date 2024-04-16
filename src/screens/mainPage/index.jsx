import React from 'react';
import "./mainPage.css";
import { InfoBanner } from '../../components/guide';
import { GeneralButton } from '../../components/button';

export const MainPage = () => {
  return (
    <div className="main">
      <InfoBanner message="Bienvenid@ Estos alimentos son los próximos a caducar." />
      <div className="square"></div>
      <div className="buttonContainer">
        <GeneralButton textElement="Administrar alimentos" path="/layout" />
        <GeneralButton textElement="Administrar usuarios" path="/adminUserPage" />
        <GeneralButton textElement="Cerrar sesión" path="/login" color='red' />
      </div>
    </div>
  );
};