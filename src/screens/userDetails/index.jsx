import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UserDetails.css';  // Asegúrate de que la ruta del CSS es correcta
import { formatDateTime, formatDate } from '../../generalFunctions';

export const UserDetails = () => {
  const { id } = useParams();
  const [transacciones, setTransacciones] = useState([]);

  useEffect(() => {
    // Reemplaza 'http://tuapi.com' con la URL base de tu API real
    fetch(`http://3.144.175.151:3000/usuario-alimento/join/all/usuario/${id}`)

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
            <th>Nombre de alimento</th>
            <th>Marca</th>
            <th>Unidades</th>
            <th>Fecha Caducidad</th>
            <th>Tipo</th>
            <th>Cantidad</th>
            <th>Fecha de cambio</th>
          </tr>
        </thead>
        <tbody>
          {transacciones.map(transaccion => (
            <tr key={transaccion.ua_id}>
              <td>{transaccion.ua_id}</td>
              <td>{transaccion.a_nombre}</td>
              <td>{transaccion.m_id === null ? 'Sin marca' : transaccion.m_nombre}</td>
              <td>{transaccion.a_cantidad + " " + transaccion.um_id}</td>
              <td>{transaccion.a_fechaCaducidad === null ?  'Sin fecha' : formatDate(transaccion.a_fechaCaducidad)}</td>
              <td>{transaccion.ua_accion === "Add" ? "Incremento": transaccion.ua_accion === "Reduce" ? "Decremento" : "Actualizacion"}</td>
              <td>{transaccion.ua_cantidad}</td>
              <td>{formatDateTime(transaccion.ua_fecha)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
