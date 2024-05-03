import React from "react";
import { GeneralButton } from "../button";
import "./confirmationPopUp.css";

export function ConfirmationPopUp({ isOpen, message, answer1, answer2, path1, closeModal }) {
  if (!isOpen) return null;
  // Verifica si solo se proporcionó una respuesta
  const isSingleAnswer = !answer2;

  const handleFirstAction = () => {
    // Aquí puedes añadir cualquier otra lógica que necesites ejecutar además de cerrar el modal
    closeModal();
  };

  return (
    <div className="confPopUp">
      <p>{message}</p>
      <div className="buttonContainer">
        {isSingleAnswer ? (
          <GeneralButton textElement={answer1} onClick={closeModal} />
        ) : (
          <>
            <GeneralButton textElement={answer1} onClick={handleFirstAction} path={path1} />
            <GeneralButton textElement={answer2} onClick={closeModal} color="red" />
          </>
        )}
      </div>
    </div>
  );
}