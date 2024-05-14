import React, { useState } from "react";
import sha256 from 'crypto-js/sha256';
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

    const hashedPassword = sha256(password).toString();

    fetch(`http://3.144.175.151:3000/usuarios/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Usuario incorrecto");
      })
      .then((userData) => {
        if (userData.u_contraseña === hashedPassword) {
          navigate('/mainPage');
        } else {
          throw new Error("Contraseña incorrecta");
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
        console.error("Error:", error.message);
      });
  };

  return (
    <div className='login'>
      <Guide message="Bienvenid@ Por favor inicia sesión." size={200} />
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
