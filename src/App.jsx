import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { CadCheckCounter } from "./components/cadCheckCounter";
import { ReturnButton } from "./components/returnButton";
import { ConfirmationPopUp } from "./components/confirmationPopUp";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <CadCheckCounter unit="test" amount="1" />
      <CadCheckCounter unit="test2" amount="21323" />
      <ReturnButton textElement="" />
      <ReturnButton textElement="Agregar Producto Existente" />
      <ConfirmationPopUp message = "¿Está seguro de que quiere eliminar estos alimentos?" answer1="Cancelar" answer2="Eliminar"/>
    </div>
  );
}

export default App;
