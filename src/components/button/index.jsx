import "./button.css";
import { useNavigate } from "react-router-dom";

export function GeneralButton({ textElement, path, color = "#5982C0" }) {
    const navigate = useNavigate();
    const handleClick = () => navigate(path); 
    const buttonStyle = {
        backgroundColor: color
    };
    return (
        <button className="add" style={buttonStyle} onClick={handleClick}>
            {textElement}
        </button>
    );
}