import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UserDetails.css';  // Asegúrate de que la ruta del CSS es correcta

export const UserDetails = () => {
  const { id } = useParams();
  const [transacciones, setTransacciones] = useState([]);

  useEffect(() => {
    // Reemplaza 'http://tuapi.com' con la URL base de tu API real
    fetch(`http://3.144.175.151:3000/usuarios/${id}/transacciones`)
      .then(response => response.json())
      .then(data => setTransacciones(data))
      .catch(error => console.error('Error:', error));
  }, [id]);

  return (
    <div className="transaccionesUsuario">
      <h1>Transacciones del Usuario {id}</h1>
      <table>
        <thead>
          <tr>
            <th>ID Transacción</th>
            <th>Tipo</th>
            <th>Cantidad</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {transacciones.map(transaccion => (
            <tr key={transaccion.transaccion_id}>
              <td>{transaccion.transaccion_id}</td>
              <td>{transaccion.tipo_accion}</td>
              <td>{transaccion.cantidad}</td>
              <td>{transaccion.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
