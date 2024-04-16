import { GeneralButton } from "../button";
import "./confirmationPopUp.css";

export function ConfirmationPopUp({ message, answer1, answer2, path1, path2 }) {
  return (
    <div className="confPopUp">
      <p>{message}</p>
      <div className="buttonContainer">
        <GeneralButton textElement = {answer1} path = {path1} />
        <GeneralButton textElement = {answer2} path = {path2} color='red'S/>
      </div>
    </div>
  );
}