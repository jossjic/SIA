import "./selectDate.css";

export function CadCheckCounter({ unit, amount }) {
  return (
    <div className="checkCard_selectDate">
      <p>Unidad: {unit}</p>
      <p>Cantidad restante: {amount}</p>
    </div>
  );
}