import React from 'react';
import "./adminUserPage.css";
import { GeneralButton } from '../../components/button';
import { InfoBanner } from '../../components/guide';
import { ReturnButton } from '../../components/returnButton';

export const UserPage = () => {
  // Simular datos de usuarios (reemplaza con datos reales de tu backend)
  const users = [
    { id: 1, username: 'LuigiMaster32', email: 'luigi@master.com' },
    { id: 2, username: 'CristianConH2', email: 'cristian@conh.com' },
    // ... otros usuarios
  ];

  // Función para manejar la eliminación de usuarios
  const handleDelete = (userId) => {
    console.log("Eliminar usuario", userId);
    // Aquí agregarías la lógica para eliminar el usuario
  };

  return (
    <div>
      <div className='buttonTopLeft'>
        <ReturnButton />
      </div>
      <div className="userPage">
        <InfoBanner message="Bienvenid@ administrador, en esta ventana podrá administrar a los usuarios del sistema, use las cajas al la izquierda del nombre de usuario para eliminar múltiples usuarios." size={100} />
        <table className="userTable">
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
                <td><input type="checkbox" /></td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <GeneralButton textElement="Ver" color="#28A745" />
                  <GeneralButton textElement="Editar" color="#17A2B8" />
                  <GeneralButton textElement="Eliminar" color="#DC3545" onClick={() => handleDelete(user.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

