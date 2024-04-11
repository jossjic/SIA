import "./confirmationPopUp.css";

export function ConfirmationPopUp({ message, answer1, answer2 }) {
  return (
    <div className="confPopUp">
      <p>{message}</p>
      <div className="buttonContainer">
        <button className="answer1"> {answer1} </button>
        <button className = "answer2"> {answer2} </button>
      </div>
    </div>
  );
}