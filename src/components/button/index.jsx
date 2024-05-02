import { on } from "supertest/lib/test";
import "./button.css";
import { useNavigate } from "react-router-dom";

export function GeneralButton({
  textElement,
  path,
  color = "#5982C0",
  onClick,
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    // Ejecutar primero la función onClick si existe
    if (onClick) {
      onClick();
    }
    // Luego, si hay un path definido, navegar a ese path
    if (path) {
      navigate(path);
    }
  };
  const buttonStyle = {
    backgroundColor: color,
  };
  return (
    <button className="add" style={buttonStyle} onClick={handleClick}>
      {textElement}
    </button>
  );
}
