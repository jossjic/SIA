import React, { useState } from "react";
import { Guide } from "../../components/guide";
import { GeneralButton } from "../../components/button";
import { useNavigate } from "react-router-dom";

import "./login.css";

export const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleClick = () => navigate("/restorePass");

  const handleLogin = () => {
    setErrorMessage("");

    if (!id || !password) {
      setErrorMessage("Por favor completa todos los campos");
      return;
    }

    fetch(`http://localhost:3001/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, password }),
    })
      .then((response) => {
        if (response.status === 200) {
          // Obtener cookies de la respuesta y guardarlas
          const myValue = id;

          // Obtener la fecha actual
          const now = new Date();

          // Calcular la fecha de expiración sumando 30 días a la fecha actual
          const expires = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 días en milisegundos

          // Convertir la fecha de expiración a un formato de cadena adecuado para la cookie
          const expiresFormatted = expires.toUTCString();

          // Guardar el valor en las cookies con la fecha de expiración y la ruta especificada
          document.cookie = `userCookieSIA=${myValue}; expires=${expiresFormatted}; path=/`;
          return response.json(); // Convertir la respuesta a JSON
        } else if (response.status === 401) {
          setErrorMessage("Usuario o contraseña incorrectos");
        } else {
          throw new Error("Error de servidor");
        }
      })
      .then((data) => {
        // Guardar el userId y userRol en el almacenamiento local
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userRol", data.userRol);

        navigate("/mainPage");
      })
      .catch((error) => {
        setErrorMessage(error.message);
        console.error("Error:", error.message);
      });
  };

  return (
    <div className="login">
      <Guide message="Bienvenid@ Por favor inicia sesión." size={130} />
      <div className="login-container">
        <div className="logInput">
          <p>Usuario</p>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <p>Contraseña</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <p className="forgotPassword" onClick={handleClick}>
          ¿Olvidaste la contraseña?
        </p>
        <GeneralButton textElement="Iniciar sesión" onClick={handleLogin} />
      </div>
    </div>
  );
};
