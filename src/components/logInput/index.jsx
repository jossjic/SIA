import { GeneralButton } from "../button";
import "./logInput.css";

export function LogInput() {
    return (
      <div className="logInput">
        <p>Correo</p>
        <input type="text" />
        <p>Contraseña</p>
        <input type="password" />
        <GeneralButton textElement="Iniciar sesión"></GeneralButton>
      </div>
    );
  }