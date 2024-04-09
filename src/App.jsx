import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { CadCheckCounter } from "./components/cadCheckCounter";
import { ReturnButton } from "./components/returnButton";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <CadCheckCounter unit="test" amount="1" />
      <CadCheckCounter unit="test2" amount="21323" />
      <ReturnButton />
    </div>
  );
}

export default App;
