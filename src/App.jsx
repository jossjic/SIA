import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { CadCheckCounter } from "./components/cadCheckCounter";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CadCheckCounter unit="test" amount="1" />
    </>
  );
}

export default App;
