import { GeneralButton } from "../button";
import "./confirmationPopUp.css";

export function ConfirmationPopUp({ isOpen, message, answer1, answer2, path1, closeModal }) {
  if (!isOpen) return null;
  return (
    <div className="confPopUp">
      <p>{message}</p>
      <div className="buttonContainer">
        <GeneralButton textElement = {answer1} path = {path1} />
        <GeneralButton textElement = {answer2} onClick = {closeModal} color='red'S/>
      </div>
    </div>
  );
}