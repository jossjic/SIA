import "./buttonSquare.css";
import { useNavigate } from "react-router-dom";

export function ButtonSquare({ textElement, path, color = "#5982C0" }) {
    const navigate = useNavigate();
    const handleClick = () => navigate(path); 
    const buttonStyle = {
        backgroundColor: color
    };
    return (
        <button className="acc" style={buttonStyle} onClick={handleClick}>
            {textElement}
        </button>
    );
}