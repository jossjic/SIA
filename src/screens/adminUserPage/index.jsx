import React from 'react';
import "./adminUserPage.css";
import { InfoBanner } from '../../components/guide';
import { ReturnButton } from '../../components/returnButton';

export const UserPage = () => {
  return (
    <div>
      <div className='buttonTopLeft'>
          <ReturnButton></ReturnButton>
      </div>
      <div className="userPage">
        <InfoBanner message="Bienvenid@ administrador, en esta ventana podrá administrar a los usuarios del sistema, 
        use las cajas al la izquierda del nombre de usuario para eliminar multiples usuarios." size={100}/>
        <div className="square"></div>
    </div>

    </div>
    
  );
};