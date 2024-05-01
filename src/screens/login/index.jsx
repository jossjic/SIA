import React, { useState } from "react";
import "./login.css";
import { Guide } from '../../components/guide';
import { GeneralButton } from '../../components/button';
import { useNavigate } from "react-router-dom";
import sha256 from 'crypto-js/sha256';

export const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState(''); 

  const navigate = useNavigate();

  const handleClick = () => navigate('/restorePass'); 

  const handleLogin = () => {
    const hashedPassword = sha256(password).toString(); 
    console.log(hashedPassword);

    fetch(`http://3.20.237.82:3000/usuarios/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Usuario no encontrado");
      })
      .then((userData) => {
        if (userData.u_contraseña === hashedPassword) {
          console.log("Inicio de sesión exitoso");
          navigate('/mainPage'); 
        } else {
          throw new Error("Contraseña incorrecta");
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  return (
    <div className='login'>
      <div className="mensaje">
        <Guide message="Bienvenid@ Por favor inicia sesión." size={130} />
      </div>
      <div className='login-container'>
        <div className="logInput">
          <p>Correo</p>
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
          <p>Contraseña</p>        
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <p className="forgotPassword" onClick={handleClick}>¿Olvidaste la contraseña?</p>
        <GeneralButton textElement="Iniciar sesión" onClick={handleLogin} />
      </div>
    </div>
  );
};