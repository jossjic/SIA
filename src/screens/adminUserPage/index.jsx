import React from 'react';
import "./adminUserPage.css";
import { GeneralButton } from '../../components/button';
import { InfoBanner } from '../../components/guide';
import { ReturnButton } from '../../components/returnButton';

export const UserPage = () => {
  const users = [
    { id: 1, username: 'LuigiMaster32', email: 'luigi@master.com' },
  { id: 2, username: 'CristianConH2', email: 'cristian@conh.com' },
  { id: 3, username: 'Vanech20', email: 'vanech@gmail.com' },
  { id: 4, username: 'jossijc', email: 'jossijc_03@hotmail.com' },
  { id: 5, username: 'augustusGloop03', email: 'augustus@gloop.com' },
  { id: 6, username: 'doñaPatricia420', email: 'doña@paty.com' },
  { id: 7, username: 'JosechuLeton', email: 'josechu@leton.com' },
  { id: 8, username: 'LACG', email: 'lac@gmail.com' },
  { id: 9, username: 'ChrisEvil52', email: 'chris@evil.com' },
  { id: 10, username: 'JacquieVA20', email: 'jacquie@va.com' },
  ];

  const handleDelete = (userId) => {
    console.log("Eliminar usuario", userId);
    // Aquí agregarías la lógica para eliminar el usuario
  };

  return (
    <div className='userPage'>
      <div className='buttonTopLeft'>
        <ReturnButton />
      </div>
      <InfoBanner message="Bienvenid@ administrador, en esta ventana podrá administrar a los usuarios del sistema, 
      use las cajas al la izquierda del nombre de usuario para eliminar múltiples usuarios." size={100}/>
        <div className="tableContainer">
          <table className="userTable square">
            <thead>
              <tr>
                <th></th> {/* Espacio para los checkboxes */}
                <th>Usuario</th>
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td><input type="checkbox" className="checkboxLarge" /></td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <GeneralButton textElement=" Ver  " color="#28A745" className="generalButton"/>
                    <GeneralButton textElement="  Editar  " color="#19739A" className="generalButton"/>
                    <GeneralButton textElement="  Eliminar  " color="#DC3545" className="generalButton" onClick={() => handleDelete(user.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
};
