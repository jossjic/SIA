import React, { useState } from "react";
import { Guide } from '../../components/guide';
import { GeneralButton } from '../../components/button';
import { useNavigate } from "react-router-dom";

import "./login.css";

export const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleClick = () => navigate('/restorePass');

  const handleLogin = () => {
    setErrorMessage('');

    if (!id || !password) {
      setErrorMessage('Por favor completa todos los campos');
      return;
    }
    
    fetch(`http://3.144.175.151:3000/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, password }), 
      credentials: 'include'
    })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 401) {
        setErrorMessage('Usuario o contraseña incorrectos');
      } else {
        throw new Error("Error de servidor");
      }
    })
    .then(data => {
      // Guardar tokens en localStorage
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      navigate('/mainPage'); 
    })
    .catch(error => {
      setErrorMessage(error.message);
      console.error("Error:", error.message);
    });
  };

  return (
    <div className='login'>
      <Guide message="Bienvenid@ Por favor inicia sesión." size={130} />
      <div className='login-container'>
        <div className="logInput">
          <p>Usuario</p>
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
          <p>Contraseña</p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <p className="forgotPassword" onClick={handleClick}>¿Olvidaste la contraseña?</p>
        <GeneralButton textElement="Iniciar sesión" onClick={handleLogin} />
      </div>
    </div>
  );
};