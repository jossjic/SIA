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
    if (onClick && !path) {
      onClick();
    } else {
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
