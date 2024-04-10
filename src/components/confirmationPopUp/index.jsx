import "./confirmationPopUp.css";

export function ConfirmationPopUp({ message }) {
  return (
    <div className="confPopUp">
      <p>{message}</p>
      <div className="buttonContainer">
        <button className="cancel"> Cancelar </button>
        <button className = "delete"> Eliminar </button>
      </div>
    </div>
  );
}